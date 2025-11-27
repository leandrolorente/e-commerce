import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../models/interfaces/product.interface';
import { ProductCategory } from '../../../../models/enums/product-category.enum';
import { AdminProductsService } from '../../services/admin-products.service';

interface ProductFormData {
  name: string;
  description: string;
  category: ProductCategory | '';
  price: number;
  discountPrice?: number;
  stock: number;
}

interface ImagePreview {
  url: string;
  file?: File;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  isLoading = signal(false);
  showModal = signal(false);
  showDeleteConfirm = signal(false);
  isSaving = signal(false);
  isEditMode = signal(false);
  productToDelete = signal<Product | null>(null);
  editingProductId = signal<string | null>(null);

  // Image upload
  imagePreviews = signal<ImagePreview[]>([]);
  isDragging = signal(false);

  searchTerm = '';
  selectedCategory: ProductCategory | '' = '';

  categories = [
    { value: ProductCategory.AFTERCARE, label: 'Cuidados Pós-Tatuagem' },
    { value: ProductCategory.CLOTHING, label: 'Vestuário' },
    { value: ProductCategory.ACCESSORIES, label: 'Acessórios' },
    { value: ProductCategory.EQUIPMENT, label: 'Equipamentos' },
    { value: ProductCategory.GIFT_CARD, label: 'Vale Presente' },
    { value: ProductCategory.ART, label: 'Arte' }
  ];

  formData: ProductFormData = this.getEmptyFormData();

  filteredProducts = computed(() => {
    let filtered = this.products();

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    return filtered;
  });

  constructor(private adminProductsService: AdminProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.adminProductsService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  applyFilters() {
    // Triggers computed signal update
  }

  openCreateModal() {
    this.isEditMode.set(false);
    this.editingProductId.set(null);
    this.formData = this.getEmptyFormData();
    this.imagePreviews.set([]);
    this.showModal.set(true);
  }

  openEditModal(product: Product) {
    this.isEditMode.set(true);
    this.editingProductId.set(product.id);
    this.imagePreviews.set(product.images.map(url => ({ url })));
    this.formData = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock
    };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.formData = this.getEmptyFormData();
    this.imagePreviews.set([]);
  }

  saveProduct() {
    if (!this.formData.name || !this.formData.category || this.formData.price <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (this.imagePreviews().length === 0) {
      alert('Por favor, adicione pelo menos uma imagem do produto');
      return;
    }

    this.isSaving.set(true);

    // Em uma aplicação real, aqui você faria upload das imagens para o servidor
    // Por enquanto, vamos usar as URLs de preview ou manter URLs existentes
    const imageUrls = this.imagePreviews().map(preview => {
      // Se for arquivo novo (tem file), em produção enviaria para servidor e receberia URL
      // Por enquanto, mantém a URL do preview ou URL existente
      return preview.url;
    });

    const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: this.formData.name,
      description: this.formData.description,
      category: this.formData.category as ProductCategory,
      price: this.formData.price,
      discountPrice: this.formData.discountPrice,
      stock: this.formData.stock,
      images: imageUrls.length > 0 ? imageUrls : ['assets/products/placeholder.jpg'],
      rating: 0,
      reviewCount: 0
    };

    if (this.isEditMode() && this.editingProductId()) {
      this.adminProductsService.updateProduct(this.editingProductId()!, productData).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
          this.isSaving.set(false);
          alert('Produto atualizado com sucesso!');
        },
        error: () => {
          this.isSaving.set(false);
          alert('Erro ao atualizar produto');
        }
      });
    } else {
      this.adminProductsService.createProduct(productData).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
          this.isSaving.set(false);
          alert('Produto criado com sucesso!');
        },
        error: () => {
          this.isSaving.set(false);
          alert('Erro ao criar produto');
        }
      });
    }
  }

  confirmDelete(product: Product) {
    this.productToDelete.set(product);
    this.showDeleteConfirm.set(true);
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm.set(false);
    this.productToDelete.set(null);
  }

  deleteProduct() {
    const product = this.productToDelete();
    if (!product) return;

    this.isSaving.set(true);
    this.adminProductsService.deleteProduct(product.id).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDeleteConfirm();
        this.isSaving.set(false);
        alert('Produto excluído com sucesso!');
      },
      error: () => {
        this.isSaving.set(false);
        alert('Erro ao excluir produto');
      }
    });
  }

  getCategoryLabel(category: ProductCategory): string {
    return this.categories.find(c => c.value === category)?.label || category;
  }

  // Image Upload Methods
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  handleFiles(files: File[]) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview: ImagePreview = {
          url: e.target?.result as string,
          file: file
        };
        this.imagePreviews.update(previews => [...previews, preview]);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.imagePreviews.update(previews =>
      previews.filter((_, i) => i !== index)
    );
  }

  private getEmptyFormData(): ProductFormData {
    return {
      name: '',
      description: '',
      category: '',
      price: 0,
      discountPrice: undefined,
      stock: 0
    };
  }
}
