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
  imageUrl: string;
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

  searchTerm = '';
  selectedCategory: ProductCategory | '' = '';

  categories = [
    { value: ProductCategory.CUIDADOS, label: 'Cuidados' },
    { value: ProductCategory.VESTUARIO, label: 'Vestuário' },
    { value: ProductCategory.ACESSORIOS, label: 'Acessórios' },
    { value: ProductCategory.EQUIPAMENTOS, label: 'Equipamentos' }
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
    this.showModal.set(true);
  }

  openEditModal(product: Product) {
    this.isEditMode.set(true);
    this.editingProductId.set(product.id);
    this.formData = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      imageUrl: product.images[0] || ''
    };
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.formData = this.getEmptyFormData();
  }

  saveProduct() {
    if (!this.formData.name || !this.formData.category || this.formData.price <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.isSaving.set(true);

    const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: this.formData.name,
      description: this.formData.description,
      category: this.formData.category as ProductCategory,
      price: this.formData.price,
      discountPrice: this.formData.discountPrice,
      stock: this.formData.stock,
      images: this.formData.imageUrl ? [this.formData.imageUrl] : ['assets/products/placeholder.jpg'],
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

  private getEmptyFormData(): ProductFormData {
    return {
      name: '',
      description: '',
      category: '',
      price: 0,
      discountPrice: undefined,
      stock: 0,
      imageUrl: ''
    };
  }
}
