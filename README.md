# E-Commerce Platform - ShopHub

Projeto Angular de e-commerce fullstack com design moderno e paleta de cores agradável.

## 🔑 Credenciais de Login Mock

### Cliente
- **Email**: `cliente@test.com`
- **Senha**: `123456`

### Administrador
- **Email**: `admin@test.com`
- **Senha**: `admin123`

### Novo Cadastro
Você pode se registrar com qualquer email/senha (será criado como cliente).

---

## Características

- ✅ Angular 19 com Standalone Components
- ✅ Sintaxe moderna (@if, @for, @switch)
- ✅ TypeScript strict mode
- ✅ Signals para gerenciamento de estado
- ✅ Lazy loading de rotas
- ✅ Responsive design (Mobile-first)
- ✅ **Design Moderno** com paleta azul petróleo (#2d5f7a), coral (#ff6b6b) e dourado (#ffd166)
- ✅ Autenticação JWT com **mock login** para desenvolvimento
- ✅ **Preview do carrinho** no header (dropdown)
- ✅ **Página de detalhes** completa com carrossel de 3-4 imagens por produto
- ✅ **Sistema de reviews/avaliações** com estrelas e comentários
- ✅ Produtos clicáveis com navegação para detalhes
- ✅ Carrinho de compras com persistência
- ✅ Sistema de checkout
- ✅ 8 produtos mock com múltiplas imagens e especificações

## Estrutura do Projeto

```
src/app/
├── core/              # Services singleton, guards, interceptors
├── shared/            # Componentes, diretivas, pipes compartilhados
├── features/          # Módulos de funcionalidades
│   ├── auth/         # Login e registro
│   ├── products/     # Catálogo de produtos
│   ├── cart/         # Carrinho de compras
│   ├── checkout/     # Finalização de pedido
│   └── admin/        # Área administrativa
└── models/            # Interfaces e enums
```

## Pré-requisitos

- Node.js 18+
- npm 9+
- Angular CLI 19+

## Instalação

```bash
# Instalar dependências
npm install

# Instalar Angular CLI globalmente (se ainda não tiver)
npm install -g @angular/cli
```

## Executar o Projeto

```bash
# Servidor de desenvolvimento
npm start
# ou
ng serve

# Acessar: http://localhost:4200
```

## Build

```bash
# Build de produção
npm run build

# Build com watch mode
npm run watch
```

## Testes

```bash
# Rodar testes unitários
npm test

# Rodar linter
npm run lint
```

## Convenções de Código

### Estrutura de Componentes
Cada componente DEVE ter 4 arquivos:
- `*.component.ts` - Lógica TypeScript
- `*.component.html` - Template HTML
- `*.component.scss` - Estilos SCSS
- `*.component.spec.ts` - Testes unitários

### Sintaxe Moderna
Sempre use a sintaxe de controle de fluxo do Angular 17+:
```typescript
// ✅ Correto
@if (condition) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// ❌ Evitar
<div *ngIf="condition">Content</div>
<div *ngFor="let item of items">{{ item.name }}</div>
```

### Signals
Use signals para estado reativo:
```typescript
const count = signal(0);
const doubled = computed(() => count() * 2);

effect(() => {
  console.log('Count:', count());
});
```

## Funcionalidades Principais

### Área do Cliente
- Navegação de produtos com filtros
- Busca de produtos
- Visualização de detalhes
- Adicionar ao carrinho
- Finalizar compra

### Área Administrativa
- Dashboard com métricas
- Gerenciamento de produtos (CRUD)
- Gerenciamento de pedidos
- Gerenciamento de usuários

## Tecnologias

- **Frontend**: Angular 19
- **Estilo**: SCSS com variáveis CSS
- **HTTP**: HttpClient com interceptors
- **Roteamento**: Angular Router com lazy loading
- **Formulários**: Template-driven e Reactive Forms
- **Testes**: Jasmine + Karma

## API Backend

Este projeto espera uma API REST no endpoint `http://localhost:3000/api` com os seguintes endpoints:

### Auth
- POST `/auth/login` - Login
- POST `/auth/register` - Registro

### Products
- GET `/products` - Listar produtos
- GET `/products/:id` - Detalhes do produto
- POST `/products` - Criar produto (admin)
- PUT `/products/:id` - Atualizar produto (admin)
- DELETE `/products/:id` - Deletar produto (admin)

### Orders
- GET `/orders` - Listar pedidos
- GET `/orders/:id` - Detalhes do pedido
- POST `/orders` - Criar pedido
- PATCH `/orders/:id/status` - Atualizar status

## Roadmap

- [ ] Implementar backend Node.js/NestJS
- [ ] Adicionar testes E2E
- [ ] Implementar PWA
- [ ] Adicionar i18n (internacionalização)
- [ ] Implementar SSR/SSG
- [ ] Integração com gateway de pagamento
- [ ] Sistema de reviews e ratings

## Licença

MIT
