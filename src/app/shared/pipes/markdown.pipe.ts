import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    let html = value
      // Negrito: **texto** ou ***texto***
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong>$1</strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Itálico: *texto*
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Lista com marcadores: ✓ ou - ou •
      .replace(/^([✓✅❌•\-]) (.+)$/gm, '<li>$2</li>')
      // Emojis de seção (mantém como texto normal)
      .replace(/^(🎯|📍|💰|🎨|📝|💡|❌|✅)(.+)$/gm, '<div class="section-title">$1$2</div>')
      // Quebras de linha duplas = parágrafo
      .replace(/\n\n/g, '</p><p>')
      // Quebras de linha simples = <br>
      .replace(/\n/g, '<br>');

    // Envolve listas em <ul>
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    // Envolve em parágrafo se não tiver tags de bloco
    if (!html.includes('<p>') && !html.includes('<div>')) {
      html = `<p>${html}</p>`;
    }

    return this.sanitizer.sanitize(1, html) || '';
  }
}
