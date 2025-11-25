import { Injectable, signal, computed, effect } from '@angular/core';
import { Cart, CartItem, Product } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  private readonly TAX_RATE = 0.1; // 10% tax
  private readonly SHIPPING_COST = 15.00;

  private cartItemsSignal = signal<CartItem[]>(this.loadCartFromStorage());

  cartItems = this.cartItemsSignal.asReadonly();
  items = this.cartItemsSignal.asReadonly(); // Alias para compatibilidade
  
  itemCount = computed(() => 
    this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + (price * item.quantity);
    }, 0)
  );

  tax = computed(() => this.subtotal() * this.TAX_RATE);
  
  shipping = computed(() => this.cartItemsSignal().length > 0 ? this.SHIPPING_COST : 0);
  
  total = computed(() => this.subtotal() + this.tax() + this.shipping());

  cart = computed<Cart>(() => ({
    items: this.cartItemsSignal(),
    subtotal: this.subtotal(),
    tax: this.tax(),
    shipping: this.shipping(),
    total: this.total()
  }));

  constructor() {
    // Persist cart to localStorage whenever it changes
    effect(() => {
      const items = this.cartItemsSignal();
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    });
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSignal();
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      this.cartItemsSignal.set(updatedItems);
    } else {
      this.cartItemsSignal.set([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSignal().filter(item => item.product.id !== productId);
    this.cartItemsSignal.set(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItemsSignal();
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);
    
    if (itemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[itemIndex].quantity = quantity;
      this.cartItemsSignal.set(updatedItems);
    }
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }

  private loadCartFromStorage(): CartItem[] {
    const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  }
}
