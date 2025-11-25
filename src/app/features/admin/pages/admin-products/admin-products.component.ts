import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" style="padding: 2rem 0;">
      <h1>Gerenciar Produtos</h1>
      <p>CRUD de produtos em desenvolvimento...</p>
    </div>
  `,
  styles: []
})
export class AdminProductsComponent {}
