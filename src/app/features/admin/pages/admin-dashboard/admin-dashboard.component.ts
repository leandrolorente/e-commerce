import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container" style="padding: 2rem 0;">
      <h1>Dashboard Administrativo</h1>
      <div class="admin-nav" style="display: flex; gap: 1rem; margin: 2rem 0;">
        <a routerLink="/admin/products" class="btn btn-primary">Gerenciar Produtos</a>
        <a routerLink="/admin/orders" class="btn btn-primary">Gerenciar Pedidos</a>
        <a routerLink="/admin/schedule" class="btn btn-primary">Agenda de Agendamentos</a>
      </div>
      <p>Bem-vindo à área administrativa!</p>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent {}
