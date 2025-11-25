import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" style="padding: 2rem 0;">
      <h1>Gerenciar Pedidos</h1>
      <p>Gestão de pedidos em desenvolvimento...</p>
    </div>
  `,
  styles: []
})
export class AdminOrdersComponent {}
