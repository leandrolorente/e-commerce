import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Review {
  id?: string;
  rating: number;
  comment: string;
  photos?: string[];
  customerName?: string;
  createdAt?: Date;
}

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="review-form">
      <h3>{{ title }}</h3>
      
      <div class="rating-selector">
        <label>Sua Avaliação</label>
        <div class="stars">
          @for (star of [1,2,3,4,5]; track star) {
            <span 
              class="star"
              [class.filled]="star <= rating()"
              (click)="rating.set(star)"
              (mouseenter)="hoverRating.set(star)"
              (mouseleave)="hoverRating.set(0)"
            >
              {{ (hoverRating() >= star || rating() >= star) ? '⭐' : '☆' }}
            </span>
          }
        </div>
      </div>

      <div class="form-group">
        <label>Seu Comentário</label>
        <textarea 
          [(ngModel)]="comment"
          rows="4"
          placeholder="Conte-nos sobre sua experiência..."
          [maxlength]="500"
        ></textarea>
        <small>{{ comment.length }}/500 caracteres</small>
      </div>

      <div class="photo-upload">
        <label>Adicionar Fotos (opcional)</label>
        <input type="file" accept="image/*" multiple (change)="onPhotosSelected($event)" #fileInput style="display:none">
        <button type="button" class="btn-upload" (click)="fileInput.click()">
          📷 Adicionar Fotos
        </button>
        @if (photos().length > 0) {
          <div class="photos-preview">
            @for (photo of photos(); track $index) {
              <div class="photo-item">
                <img [src]="photo" alt="Preview">
                <button class="btn-remove" (click)="removePhoto($index)">✕</button>
              </div>
            }
          </div>
        }
      </div>

      <div class="form-actions">
        <button type="button" class="btn-cancel" (click)="onCancel()">Cancelar</button>
        <button type="button" class="btn-submit" (click)="submitReview()" [disabled]="!canSubmit()">
          Enviar Avaliação
        </button>
      </div>
    </div>
  `,
  styles: [`
    .review-form{background:#fff;padding:2rem;border-radius:12px}h3{color:var(--primary-color);margin-bottom:1.5rem}.rating-selector{margin-bottom:1.5rem;label{display:block;margin-bottom:0.5rem;font-weight:600}}.stars{display:flex;gap:0.5rem;font-size:2rem}.star{cursor:pointer;transition:transform 0.2s;&:hover{transform:scale(1.2)}&.filled{color:#FFD700}}.form-group{margin-bottom:1.5rem;label{display:block;margin-bottom:0.5rem;font-weight:600}textarea{width:100%;padding:0.75rem;border:2px solid #e0e0e0;border-radius:8px;font-family:inherit;resize:vertical;&:focus{outline:none;border-color:var(--primary-color)}}small{color:#666;font-size:0.85rem}}.photo-upload{margin-bottom:1.5rem}.btn-upload{padding:0.75rem 1.5rem;background:#f0f0f0;border:none;border-radius:8px;cursor:pointer;font-weight:600;&:hover{background:#e0e0e0}}.photos-preview{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:1rem;margin-top:1rem}.photo-item{position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;img{width:100%;height:100%;object-fit:cover}.btn-remove{position:absolute;top:0.25rem;right:0.25rem;width:24px;height:24px;border-radius:50%;background:rgba(255,0,0,0.8);color:#fff;border:none;cursor:pointer;font-size:0.8rem}}.form-actions{display:flex;gap:1rem;justify-content:flex-end}.btn-cancel,.btn-submit{padding:0.75rem 1.5rem;border:none;border-radius:8px;cursor:pointer;font-weight:600}.btn-cancel{background:#f0f0f0;&:hover{background:#e0e0e0}}.btn-submit{background:var(--primary-color);color:#fff;&:disabled{opacity:0.5;cursor:not-allowed}&:not(:disabled):hover{opacity:0.9}}
  `]
})
export class ReviewFormComponent {
  @Input() title = 'Deixe sua Avaliação';
  @Input() productId?: string;
  @Output() reviewSubmitted = new EventEmitter<Review>();
  @Output() cancelled = new EventEmitter<void>();

  rating = signal(0);
  hoverRating = signal(0);
  comment = '';
  photos = signal<string[]>([]);

  onPhotosSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photos.update(photos => [...photos, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  removePhoto(index: number) {
    this.photos.update(photos => photos.filter((_, i) => i !== index));
  }

  canSubmit(): boolean {
    return this.rating() > 0 && this.comment.trim().length > 10;
  }

  submitReview() {
    if (!this.canSubmit()) return;

    const review: Review = {
      rating: this.rating(),
      comment: this.comment.trim(),
      photos: this.photos(),
      createdAt: new Date()
    };

    this.reviewSubmitted.emit(review);
    this.resetForm();
  }

  onCancel() {
    this.cancelled.emit();
    this.resetForm();
  }

  resetForm() {
    this.rating.set(0);
    this.comment = '';
    this.photos.set([]);
  }
}
