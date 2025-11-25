import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@shared/components/layout/header/header.component';
import { FooterComponent } from '@shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <main class="container" style="min-height: 60vh; padding: 2rem 0;">
      <h1>Finalizar Compra</h1>
      <p>Página de checkout em desenvolvimento...</p>
      <a routerLink="/cart" class="btn btn-outline">Voltar ao Carrinho</a>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class CheckoutPageComponent {}
