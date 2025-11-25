import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  private ai: GoogleGenAI;
  private apiKey = 'AIzaSyAj5osxNPy2583Z3q_mRYR_5FXhnh6gIXQ';
  
  private systemPrompt = `Você é um assistente virtual do InkArt Studio, um estúdio de tatuagens profissional.

INFORMAÇÕES DO ESTÚDIO:
- Nome: InkArt Studio
- WhatsApp: (18) 99656-6692
- Especialidades: Realismo, Old School, Blackwork, Aquarela, Geométrico, Minimalista, Japonês, Maori/Tribal

PREÇOS APROXIMADOS:
- Pequenas (5-10cm): R$ 200 - R$ 500
- Médias (10-20cm): R$ 500 - R$ 1.500
- Grandes (20cm+): R$ 1.500 - R$ 5.000+

INSTRUÇÕES:
1. Seja amigável, profissional e prestativo
2. Use emojis moderadamente (1-2 por mensagem)
3. Responda de forma concisa (máximo 150 palavras)
4. Sempre que apropriado, sugira contato via WhatsApp para orçamentos personalizados
5. Se não souber algo específico, sugira falar com os artistas
6. Foque em: preços, estilos, cuidados, agendamento, localização

EXEMPLOS DE TÓPICOS:
- Preços e orçamentos
- Estilos de tatuagem
- Processo de agendamento
- Cuidados pós-tatuagem
- Dor e sensibilidade
- Tempo de sessão
- Preparação para tatuar`;

  constructor() {
    // Inicializa o SDK oficial do Google Gemini
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
  }

  chat(messages: ChatMessage[]): Observable<GeminiResponse> {
    // Monta o histórico da conversa no formato do SDK
    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      parts: msg.parts
    }));

    // Última mensagem do usuário
    const lastUserMessage = conversationHistory
      .filter(m => m.role === 'user')
      .pop()?.parts[0]?.text || '';

    // Cria a promise usando o SDK oficial
    const generatePromise = this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: lastUserMessage,
      config: {
        systemInstruction: this.systemPrompt,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300
      }
    });

    // Converte Promise para Observable e mapeia para o formato esperado
    return from(generatePromise).pipe(
      map(response => ({
        candidates: [{
          content: {
            parts: [{ text: response.text || '' }],
            role: 'model'
          }
        }]
      }))
    );
  }

  // Fallback caso a API falhe
  getFallbackResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    if (msg.includes('preço') || msg.includes('valor') || msg.includes('quanto')) {
      return 'Os preços variam de R$ 200 a R$ 5.000+ dependendo do tamanho e complexidade. Para um orçamento personalizado, fale conosco pelo WhatsApp! 📱 (18) 99656-6692';
    }

    if (msg.includes('agendar') || msg.includes('horário')) {
      return 'Para agendar, entre em contato pelo WhatsApp (18) 99656-6692. Nossos artistas avaliarão seu projeto e definirão o melhor horário! 📅';
    }

    if (msg.includes('dói') || msg.includes('dor')) {
      return 'A dor varia conforme a área e sensibilidade. Áreas com mais músculo doem menos. Nossos artistas fazem pausas quando necessário! 💪';
    }

    return 'Posso ajudar com informações sobre tatuagens, preços e agendamento. Para detalhes específicos, fale com nossos artistas pelo WhatsApp: (18) 99656-6692 📱';
  }
}
