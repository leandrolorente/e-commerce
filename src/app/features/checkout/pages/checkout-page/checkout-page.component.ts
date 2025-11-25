import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container" style="min-height: 60vh; padding: 2rem 0;">
      <h1>Finalizar Compra</h1>
      <p>Página de checkout em desenvolvimento...</p>
      <a routerLink="/cart" class="btn btn-outline">Voltar ao Carrinho</a>
    </main>
  `,
  styles: []
})
export class CheckoutPageComponent {}
