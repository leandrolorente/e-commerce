import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      @for (notification of notificationService.notifications(); track notification.id) {
        <div 
          class="notification" 
          [class]="'notification-' + notification.type"
          (click)="notificationService.remove(notification.id)">
          <div class="notification-content">
            <span class="notification-icon">
              @switch (notification.type) {
                @case ('success') { ✓ }
                @case ('error') { ✕ }
                @case ('warning') { ⚠ }
                @case ('info') { ℹ }
              }
            </span>
            <span class="notification-message">{{ notification.message }}</span>
          </div>
          <button 
            class="notification-close" 
            (click)="notificationService.remove(notification.id)">
            ✕
          </button>
        </div>
      }
    </div>

    @if (notificationService.confirmDialog(); as dialog) {
      <div class="confirm-overlay" (click)="notificationService.closeConfirm()">
        <div class="confirm-dialog" (click)="$event.stopPropagation()">
          <div class="confirm-icon">⚠</div>
          <h3>Confirmação</h3>
          <p>{{ dialog.message }}</p>
          <div class="confirm-actions">
            <button class="btn-cancel" (click)="handleCancel(dialog)">
              Cancelar
            </button>
            <button class="btn-confirm" (click)="handleConfirm(dialog)">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      pointer-events: none;
      min-width: 320px;
      max-width: 500px;
    }

    .notification {
      background: white;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      pointer-events: all;
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      border-left: 4px solid;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
    }

    .notification-icon {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }

    .notification-message {
      font-size: 1rem;
      line-height: 1.4;
      color: #333;
    }

    .notification-close {
      background: transparent;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
      }
    }

    .notification-success {
      border-left-color: #4CAF50;
      
      .notification-icon {
        color: #4CAF50;
      }
    }

    .notification-error {
      border-left-color: #f44336;
      
      .notification-icon {
        color: #f44336;
      }
    }

    .notification-warning {
      border-left-color: #FFA500;
      
      .notification-icon {
        color: #FFA500;
      }
    }

    .notification-info {
      border-left-color: #2196F3;
      
      .notification-icon {
        color: #2196F3;
      }
    }

    @media (max-width: 640px) {
      .notification-container {
        min-width: 280px;
        max-width: calc(100vw - 2rem);
      }

      .notification {
        padding: 0.875rem 1.25rem;
      }

      .notification-message {
        font-size: 0.9rem;
      }
    }

    .confirm-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 1rem;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .confirm-dialog {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
      animation: scaleIn 0.3s ease-out;
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.9);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    .confirm-icon {
      font-size: 3rem;
      color: #FFA500;
      margin-bottom: 1rem;
    }

    .confirm-dialog h3 {
      margin: 0 0 1rem;
      color: #333;
      font-size: 1.5rem;
    }

    .confirm-dialog p {
      margin: 0 0 2rem;
      color: #666;
      font-size: 1rem;
      line-height: 1.5;
    }

    .confirm-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .confirm-actions button {
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 120px;
    }

    .btn-cancel {
      background: #f0f0f0;
      color: #333;

      &:hover {
        background: #e0e0e0;
      }
    }

    .btn-confirm {
      background: var(--primary-color, #1b4d3e);
      color: white;

      &:hover {
        opacity: 0.9;
      }
    }

    @media (max-width: 640px) {
      .confirm-dialog {
        padding: 1.5rem;
      }

      .confirm-actions {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  `]
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  handleConfirm(dialog: any) {
    dialog.onConfirm();
    this.notificationService.closeConfirm();
  }

  handleCancel(dialog: any) {
    if (dialog.onCancel) {
      dialog.onCancel();
    }
    this.notificationService.closeConfirm();
  }
}
