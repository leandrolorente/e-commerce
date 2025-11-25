# GuaranaTattoShop - Estúdio Guarana Tatto

Plataforma web completa para o **Estúdio Guarana Tatto** com catálogo interativo de tatuagens, mapa corporal SVG, assistente virtual com IA (Google Gemini 2.5 Flash) e integração WhatsApp.

## 🎨 Identidade Visual

**Paleta de Cores do Estúdio:**
- 🟢 **Verde Escuro** (#1b4d3e) - Cor principal do ambiente físico
- 🟤 **Bronze/Caramelo** (#d4a574) - Cor secundária do ambiente
- 🌸 **Coral Suave** (#e8b4a0) - Tons de acabamento
- 🔴 **Rosa Vibrante** (#d81159) - Destaque e CTAs
- 🟡 **Laranja/Dourado** (#ffa500) - Avisos e destaques secundários
- 🌿 **Verde Oliva** (#8b9d40) - Tonalidade de desenhos

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

## 🎨 Características Principais

### Tecnologia
- ✅ Angular 19 com Standalone Components
- ✅ Sintaxe moderna (@if, @for, @switch)
- ✅ TypeScript strict mode
- ✅ Signals para gerenciamento de estado
- ✅ Lazy loading de rotas
- ✅ Responsive design (Mobile-first)
- ✅ **Design com Identidade Visual do Estúdio** - Verde escuro (#1b4d3e), Bronze (#d4a574), Rosa vibrante (#d81159)

### Funcionalidades de Tatuagem
- ✅ **Mapa Corporal Interativo (SVG)** - 40+ áreas do corpo clicáveis para selecionar localização
- ✅ **Catálogo de Tatuagens** - 40 designs mockados com filtros por área do corpo
- ✅ **Página de Detalhes** - Galeria de imagens, informações completas, preços
- ✅ **Integração WhatsApp** - Botões de consulta direta (18) 99656-6692
- ✅ **Sistema de Estilos** - Realismo, Old School, Blackwork, Aquarela, Geométrico, etc.

### Assistente Virtual com IA
- ✅ **Google Gemini 2.5 Flash** - Integração oficial via SDK `@google/genai`
- ✅ **Especialista em Tatuagens** - Responde sobre estilos, preços, cuidados, curiosidades
- ✅ **Formatação Markdown** - Negrito, listas, emojis renderizados com MarkdownPipe
- ✅ **Fallback Inteligente** - Respostas locais em caso de erro na API
- ✅ **Chat Widget Flutuante** - Interface moderna com animações
- ✅ **Histórico de Conversa** - Contexto preservado durante a sessão

### Loja de Produtos
- ✅ Produtos para cuidados pós-tatuagem
- ✅ Preview do carrinho no header
- ✅ Sistema de reviews/avaliações
- ✅ Carrinho de compras com persistência
- ✅ Finalização via WhatsApp

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

## 🤖 Assistente Virtual com IA

### Integração Google Gemini 2.5 Flash

O chat bot utiliza o SDK oficial do Google para respostas inteligentes:

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY' });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: userMessage,
  config: {
    systemInstruction: systemPrompt,
    temperature: 0.7,
    maxOutputTokens: 300
  }
});
```

### Conhecimento do Assistente

O bot responde sobre:
- 📍 **Navegação**: Como usar o site, selecionar áreas do corpo, explorar catálogo
- 🎨 **Estilos**: 10+ estilos de tatuagem (história, características, técnicas)
- 💰 **Preços**: Tabela completa (R$ 200 - R$ 8.000+) por tamanho
- 🏥 **Cuidados**: Antes, durante e pós-tatuagem (2-4 semanas cicatrização)
- 📱 **Contato**: WhatsApp (18) 99656-6692 para orçamentos
- 💡 **Curiosidades**: História, simbolismos, tendências, mitos

### Formatação de Mensagens

O MarkdownPipe converte formatação Markdown para HTML:
- `**texto**` → **negrito**
- `*texto*` → *itálico*
- `✓ item` → lista com checkmark
- Emojis de seção destacados
- Quebras de linha preservadas

## 🛠 Tecnologias

- **Frontend**: Angular 19
- **IA**: Google Gemini 2.5 Flash (`@google/genai`)
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

## 🚀 Deploy no GitHub Pages

### Deploy Automático (CI/CD) ✅

O projeto está configurado com **GitHub Actions** para deploy automático!

**Como funciona:**
1. Faça qualquer alteração no código
2. Commit e push para `main`
3. GitHub Actions faz build e deploy automaticamente
4. Site atualizado em 2-3 minutos

```bash
git add .
git commit -m "Minhas alterações"
git push origin main
# Aguarde 2-3 minutos - deploy automático! 🚀
```

**Acesse seu site em:**
```
https://leandrolorente.github.io/e-commerce/
```

### Primeira Configuração (Apenas uma vez)

1. **Ative o GitHub Pages:**
   - Vá em: `https://github.com/leandrolorente/e-commerce/settings/pages`
   - **Source**: GitHub Actions
   - Salve

2. **Faça o primeiro push:**
```bash
git add .
git commit -m "Configure GitHub Pages with CI/CD"
git push origin main
```

3. **Acompanhe o deploy:**
   - Acesse: `https://github.com/leandrolorente/e-commerce/actions`
   - Aguarde o workflow "Deploy to GitHub Pages" ✅

### Deploy Manual (Alternativa)

Se preferir fazer deploy manual sem CI/CD:

```bash
npm run deploy
```

### Atualizações Futuras

Apenas faça commit e push - o resto é automático! 🎉
```bash
git add .
git commit -m "Nova feature"
git push origin main
```

O GitHub Actions cuida de tudo:
- ✅ Instala dependências
- ✅ Build de produção
- ✅ Deploy no GitHub Pages
- ✅ Notificações de sucesso/erro


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
