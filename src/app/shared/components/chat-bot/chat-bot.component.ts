import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { LlmService, ChatMessage } from '@core/services/llm.service';
import { MarkdownPipe } from '@shared/pipes/markdown.pipe';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isOpen = signal(false);
  isTyping = signal(false);
  messages = signal<Message[]>([]);
  userInput = signal('');
  whatsappNumber = '5518996566692';
  conversationHistory: ChatMessage[] = [];

  constructor(private llmService: LlmService) {
    // Mensagem de boas-vindas
    this.addBotMessage(
      'Olá! 👋 Sou o assistente virtual do InkArt Studio. Como posso ajudá-lo hoje?\n\n' +
      'Posso te ajudar com:\n' +
      '• Informações sobre tatuagens\n' +
      '• Estilos e técnicas\n' +
      '• Preços e agendamento\n' +
      '• Cuidados com tatuagens'
    );
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendMessage() {
    const text = this.userInput().trim();
    if (!text) return;

    // Adiciona mensagem do usuário
    this.messages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);

    // Adiciona à história da conversa
    this.conversationHistory.push({
      role: 'user',
      parts: [{ text }]
    });

    this.userInput.set('');
    this.isTyping.set(true);

    // Chama a API Gemini usando o SDK oficial
    this.llmService.chat(this.conversationHistory).subscribe({
      next: (response) => {
        const botResponse = response.candidates[0]?.content?.parts[0]?.text || 
                           'Desculpe, não consegui processar sua mensagem.';
        
        this.addBotMessage(botResponse);
        this.isTyping.set(false);

        // Adiciona resposta ao histórico
        this.conversationHistory.push({
          role: 'model',
          parts: [{ text: botResponse }]
        });

        // Detecta se deve abrir WhatsApp
        const shouldOpen = this.checkShouldOpenWhatsApp(text, botResponse);
        if (shouldOpen) {
          setTimeout(() => {
            this.openWhatsApp(`Olá! Vim através do chat do site. ${text}`);
          }, 1500);
        }
      },
      error: (error) => {
        console.error('Erro ao chamar Gemini API:', error);
        // Usa fallback em caso de erro
        const fallbackResponse = this.llmService.getFallbackResponse(text);
        this.addBotMessage(fallbackResponse);
        this.isTyping.set(false);
      }
    });
  }

  private addBotMessage(text: string) {
    this.messages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }

  private checkShouldOpenWhatsApp(userMsg: string, botMsg: string): boolean {
    const msg = userMsg.toLowerCase();
    const response = botMsg.toLowerCase();
    
    return (msg.includes('sim') || msg.includes('quero') || msg.includes('pode')) &&
           (response.includes('whatsapp') || response.includes('contato'));
  }

  private openWhatsApp(message: string) {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encoded}`, '_blank');
  }

  clearChat() {
    this.messages.set([]);
    this.conversationHistory = [];
    this.addBotMessage('Chat limpo! Como posso ajudar? 😊');
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
