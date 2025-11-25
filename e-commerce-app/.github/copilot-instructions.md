# Angular E-Commerce Project - AI Coding Agent Guide

## Architecture Overview

Este é um projeto Angular standalone de e-commerce (modelo Amazon/Mercado Livre) com duas áreas principais:
- **Customer Area**: Interface para clientes navegarem, comprarem produtos e gerenciarem carrinho
- **Admin Area**: Dashboard para gerentes gerenciarem produtos, pedidos e estoque

### Estrutura de Diretórios

```
src/app/
├── core/                    # Singleton services, guards, interceptors
├── shared/                  # Componentes, diretivas, pipes compartilhados
│   ├── components/
│   ├── directives/
│   └── pipes/
├── features/                # Módulos de funcionalidades
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── admin/
└── models/                  # Interfaces, enums, types
    ├── interfaces/
    └── enums/
```

## Convenções Obrigatórias do Projeto

### 1. Estrutura de Componentes (4 arquivos sempre)
Cada componente/página DEVE ter exatamente 4 arquivos:
```
example.component.ts       # Lógica TypeScript
example.component.html     # Template HTML
example.component.scss     # Estilos específicos
example.component.spec.ts  # Testes unitários
```

### 2. Sintaxe Moderna do Angular (v17+)
**SEMPRE use a sintaxe de controle de fluxo moderna:**
- ✅ `@if (condition) { }` em vez de `*ngIf`
- ✅ `@for (item of items; track item.id) { }` em vez de `*ngFor`
- ✅ `@switch` em vez de `*ngSwitch`
- ✅ Componentes standalone com `imports` inline

**Exemplo:**
```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html'
})
```

```html
@if (products.length > 0) {
  <div class="products-grid">
    @for (product of products; track product.id) {
      <app-product-card [product]="product" />
    }
  </div>
} @else {
  <p>Nenhum produto encontrado</p>
}
```

### 3. Organização de Models e Enums
- **Interfaces**: `src/app/models/interfaces/`
- **Enums**: `src/app/models/enums/`
- Sempre export em barrels (`index.ts`) para imports limpos

```typescript
// models/enums/user-role.enum.ts
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

// models/interfaces/product.interface.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
}
```

### 4. Services
- Services globais em `core/services/`
- Services específicos de features em `features/{feature}/services/`
- Use signals para estado reativo: `signal()`, `computed()`, `effect()`

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  totalItems = computed(() => this.cartItems().length);
}
```

### 5. Layout Responsivo
- Mobile-first approach com breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Use CSS Grid/Flexbox para layouts
- Componentes de layout compartilhados em `shared/components/layout/`

### 6. Rotas
- Lazy loading para todas as features
- Guards para proteção de rotas (auth, roles)
- Preloading strategy configurada

```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
    canActivate: [authGuard, roleGuard]
  }
];
```

## Fluxos de Desenvolvimento

### Criar novo componente
```bash
ng generate component features/{feature}/components/{name} --standalone
```
Certifique-se de que os 4 arquivos foram criados.

### Criar novo service
```bash
ng generate service features/{feature}/services/{name}
```

### Build e Testes
```bash
npm run start          # Dev server (porta 4200)
npm run build          # Build de produção
npm run test           # Testes unitários
npm run lint           # ESLint
```

## Padrões de Código

### State Management
- Signals nativos para estado local/global
- Services com signals para compartilhar estado entre componentes

### HTTP Requests
- HttpClient em services
- Interceptors para auth tokens em `core/interceptors/`
- Tratamento de erros centralizado

### Nomenclatura
- Components: PascalCase sufixo Component (`ProductCardComponent`)
- Services: PascalCase sufixo Service (`ProductService`)
- Interfaces: PascalCase sem prefixo I (`Product`, não `IProduct`)
- Enums: PascalCase sufixo Enum (`UserRoleEnum`)
- Arquivos: kebab-case (`product-card.component.ts`)

## Recursos Chave do E-Commerce

### Carrinho de Compras
- `CartService` gerencia estado do carrinho com signals
- Persistência em localStorage
- Cálculo automático de totais com `computed()`

### Autenticação
- JWT tokens armazenados em localStorage
- Auth guard protege rotas privadas
- Role guard separa admin/customer

### Catálogo de Produtos
- Grid responsivo com filtros e busca
- Paginação server-side
- Cache de dados em services

### Área Admin
- Dashboard com métricas
- CRUD completo de produtos
- Gestão de pedidos e usuários
