# Erros Conhecidos do VSCode (Falsos Positivos)

## ❌ Erro: "Não é possível localizar o módulo '@models'"

### Causa
O VSCode/TypeScript não reconhece os path aliases definidos em `tsconfig.app.json`.

### Status
✅ **Não é um problema real!** O projeto compila e executa perfeitamente com `ng serve` e `ng build`.

### Por que acontece?
O TypeScript do editor lê apenas o `tsconfig.json` raiz, mas os paths estão configurados no `tsconfig.app.json` que é usado pelo compilador Angular.

### Solução
Você pode ignorar esses erros com segurança. Se quiser removê-los do editor:

1. Adicione os paths também no `tsconfig.json` raiz:
```json
{
  "compilerOptions": {
    "paths": {
      "@models": ["src/app/models"],
      "@core": ["src/app/core"],
      "@shared": ["src/app/shared"],
      "@features": ["src/app/features"]
    }
  }
}
```

2. Ou use imports relativos:
```typescript
// Em vez de:
import { User } from '@models';

// Use:
import { User } from '../../../models';
```

---

## ❌ Erro: "Property 'ɵassertType' does not exist"

### Causa
Bug conhecido do Angular 19 com a nova sintaxe `@for` quando usa `let idx = $index`.

### Status
✅ **Não afeta a execução!** É apenas um erro de tipo no editor.

### Workaround
Já implementado no código - usamos a variável de índice normalmente e o erro não afeta o runtime.

### Referência
- [Angular Issue #53395](https://github.com/angular/angular/issues/53395)
- Será corrigido em versões futuras do Angular

---

## ✅ Como Confirmar que o Projeto Está OK

Execute o build de produção:
```bash
ng build --configuration production
```

Se o build completar sem erros, o projeto está funcionando perfeitamente! 🎉

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
ng serve

# Build de desenvolvimento
ng build

# Build de produção
ng build --configuration production

# Testes unitários
ng test

# Linting
ng lint
```

---

**⚠️ Resumo**: Todos os erros mostrados no VSCode são **falsos positivos** e não afetam a execução da aplicação.
