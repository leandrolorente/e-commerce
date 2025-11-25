# 🔐 Configuração de API Keys

## ⚠️ IMPORTANTE: Segurança das Chaves de API

As chaves de API **NÃO DEVEM** ser commitadas no Git por motivos de segurança.

## 📝 Como Configurar

### 1. Ambiente de Desenvolvimento Local

1. Copie o arquivo de exemplo:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```

2. Edite `src/environments/environment.ts` e adicione sua chave real do Gemini:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api',
     geminiApiKey: 'SUA_CHAVE_GEMINI_AQUI'
   };
   ```

3. Obtenha sua chave em: https://makersuite.google.com/app/apikey

### 2. Ambiente de Produção

Configure as variáveis de ambiente no seu servidor/plataforma de deploy:

- **Vercel/Netlify**: Configure nas variáveis de ambiente do projeto
- **Azure/AWS**: Use o serviço de secrets/key vault
- **Docker**: Use secrets ou variáveis de ambiente

### 3. Arquivos Protegidos

Os seguintes arquivos estão no `.gitignore` e **NÃO serão commitados**:

- ✅ `/src/environments/environment.ts` (desenvolvimento)
- ✅ `/src/environments/environment.prod.ts` (produção)
- ✅ `/src/environments/*.local.ts` (qualquer ambiente local)

### 4. O que PODE ser commitado

- ✅ `environment.example.ts` (exemplo sem chaves reais)
- ✅ Arquivos de configuração sem informações sensíveis

## 🚨 Se Você Expôs uma Chave por Acidente

1. **Revogue IMEDIATAMENTE** a chave no Google Cloud Console
2. Gere uma nova chave
3. Atualize seu arquivo local `environment.ts`
4. **NUNCA** adicione a nova chave ao Git

## 📚 Links Úteis

- [Google AI Studio - API Keys](https://makersuite.google.com/app/apikey)
- [Documentação Gemini API](https://ai.google.dev/tutorials/setup)
- [Melhores Práticas de Segurança](https://cloud.google.com/docs/authentication/api-keys)
