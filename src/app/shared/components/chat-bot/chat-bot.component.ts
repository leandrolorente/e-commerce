import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  isOpen = signal(false);
  isTyping = signal(false);
  messages = signal<Message[]>([]);
  userInput = signal('');
  whatsappNumber = '5518996566692';

  constructor() {
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

    this.userInput.set('');
    this.isTyping.set(true);

    // Simula resposta da LLM
    setTimeout(() => {
      const response = this.generateResponse(text);
      this.addBotMessage(response);
      this.isTyping.set(false);
    }, 1000 + Math.random() * 1000);
  }

  private addBotMessage(text: string) {
    this.messages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }

  private generateResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    // Detecção de intenções
    if (msg.includes('preço') || msg.includes('valor') || msg.includes('quanto custa')) {
      return 'Os preços variam conforme o tamanho, complexidade e estilo da tatuagem:\n\n' +
        '💰 Pequenas (5-10cm): R$ 200 - R$ 500\n' +
        '💰 Médias (10-20cm): R$ 500 - R$ 1.500\n' +
        '💰 Grandes (20cm+): R$ 1.500 - R$ 5.000+\n\n' +
        'Quer falar com um de nossos artistas pelo WhatsApp para um orçamento personalizado? 📱';
    }

    if (msg.includes('agendar') || msg.includes('horário') || msg.includes('marcar')) {
      return 'Para agendar sua sessão, entre em contato conosco pelo WhatsApp! 📅\n\n' +
        'Nossos artistas avaliarão seu projeto e definirão o melhor horário.\n\n' +
        'Deseja que eu abra o WhatsApp para você? 💬';
    }

    if (msg.includes('estilo') || msg.includes('técnica')) {
      return 'Trabalhamos com diversos estilos:\n\n' +
        '🎨 Realismo\n' +
        '🎨 Old School / Traditional\n' +
        '🎨 Blackwork\n' +
        '🎨 Aquarela\n' +
        '🎨 Geométrico\n' +
        '🎨 Minimalista\n' +
        '🎨 Japonês\n' +
        '🎨 Maori / Tribal\n\n' +
        'Explore nosso catálogo para ver exemplos! 👆';
    }

    if (msg.includes('cuidado') || msg.includes('cicatrização') || msg.includes('pomada')) {
      return 'Cuidados essenciais com sua tatuagem:\n\n' +
        '✅ Lave com sabonete neutro 2-3x ao dia\n' +
        '✅ Aplique pomada específica (recomendamos na sessão)\n' +
        '✅ Evite sol, piscina e mar por 30 dias\n' +
        '✅ Não coce ou retire as casquinhas\n' +
        '✅ Use roupas leves e limpas\n\n' +
        'A cicatrização completa leva cerca de 30 dias. 🩹';
    }

    if (msg.includes('dói') || msg.includes('dor') || msg.includes('anestesia')) {
      return 'A dor varia conforme a área do corpo e sua sensibilidade:\n\n' +
        '😊 Menos sensíveis: braço externo, coxa, panturrilha\n' +
        '😬 Mais sensíveis: costelas, pés, mãos, coluna\n\n' +
        'Não usamos anestesia tópica, mas fazemos pausas quando necessário!\n\n' +
        'Nossos artistas têm mãos leves e experiência. 💪';
    }

    if (msg.includes('whatsapp') || msg.includes('whats') || msg.includes('contato') || msg.includes('telefone')) {
      return 'Claro! Você pode falar conosco pelo WhatsApp:\n\n' +
        '📱 (18) 99656-6692\n\n' +
        'Vou abrir o WhatsApp para você agora! 🚀';
    }

    if (msg.includes('artista') || msg.includes('tatuador')) {
      return 'Nosso time conta com artistas experientes e especializados:\n\n' +
        '👨‍🎨 Cada tatuador tem seu estilo único\n' +
        '👨‍🎨 Todos com anos de experiência\n' +
        '👨‍🎨 Trabalhos premiados em convenções\n\n' +
        'Veja nosso catálogo para conhecer o trabalho de cada um! 🎨';
    }

    if (msg.includes('localização') || msg.includes('endereço') || msg.includes('onde')) {
      return 'Estamos localizados em:\n\n' +
        '📍 InkArt Studio\n' +
        'Entre em contato pelo WhatsApp para conhecer nosso estúdio! 🏢\n\n' +
        'Deseja falar conosco agora? 💬';
    }

    if (msg.includes('obrigad') || msg.includes('valeu')) {
      return 'Por nada! 😊 Estou aqui para ajudar!\n\n' +
        'Se precisar de mais alguma coisa, é só chamar! 🎨';
    }

    if (msg.includes('sim') || msg.includes('quero') || msg.includes('pode')) {
      this.openWhatsApp('Olá! Vim através do chat do site e gostaria de mais informações.');
      return 'Perfeito! Abrindo WhatsApp... 🚀\n\n' +
        'Nossos artistas vão te atender em breve! 😊';
    }

    // Resposta padrão
    return 'Interessante! Para informações mais detalhadas e personalizadas, ' +
      'recomendo falar diretamente com nossos artistas pelo WhatsApp! 📱\n\n' +
      'Posso abrir o WhatsApp para você agora? 💬\n\n' +
      'Ou me pergunte sobre:\n' +
      '• Preços e valores\n' +
      '• Estilos de tatuagem\n' +
      '• Agendamento\n' +
      '• Cuidados pós-tatuagem';
  }

  private openWhatsApp(defaultMessage?: string) {
    const message = encodeURIComponent(defaultMessage || 'Olá! Gostaria de mais informações.');
    window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank');
  }

  clearChat() {
    this.messages.set([]);
    this.addBotMessage('Chat limpo! Como posso ajudar? 😊');
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
