# 🚂 Deploy ViBR no Railway - Guia Completo

## 📋 Pré-requisitos

- Conta no Railway (https://railway.app)
- Repositório ViBR no GitHub
- Chaves de API necessárias (Anthropic, Clerk, Supabase)

## 🚀 Deploy Passo a Passo

### 1. Preparação (já configurado)
- ✅ `@remix-run/serve` instalado
- ✅ Script `start` configurado para Node.js
- ✅ `railway.json` configurado para usar Dockerfile
- ✅ Health check endpoint `/healthz`
- ✅ Dockerfile com segurança melhorada

#### Opções de Builder:
- **Dockerfile** (padrão): Usa configurações customizadas de segurança
- **Nixpacks** (alternativo): Detecção automática, mais simples

Para usar Nixpacks, substitua `railway.json` por `railway.nixpacks.json`

### 2. Configuração Railway

#### 2.1 Criar Projeto
```bash
1. Acesse https://railway.app
2. Clique "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório ViBR
5. Railway detectará automaticamente como Node.js
```

#### 2.2 Variáveis de Ambiente Essenciais

No painel Railway, adicione estas variáveis:

```bash
# Core
NODE_ENV=production
PORT=3000
SESSION_SECRET=seu-secret-super-seguro-aqui

# AI/Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-...

# Auth (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Supabase)
DATABASE_URL=postgresql://...
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=eyJ...

# Optional: Stripe (para billing)
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### 3. Configurações Avançadas

#### 3.1 Domínio Customizado
```bash
1. No painel Railway, vá para "Settings"
2. Clique "Domains"
3. Adicione seu domínio (ex: demo.vibr.dev)
4. Configure DNS CNAME para railway
```

#### 3.2 Monitoramento
```bash
1. Health Check: /healthz (já configurado)
2. Logs: acessíveis via painel Railway
3. Métricas: CPU, memória, requests disponíveis
```

## 🔧 Troubleshooting

### Build Failures
```bash
# Se build falhar, verificar:
1. Node.js version compatibility (>=18.18.0)
2. Dependências instaladas corretamente
3. Variáveis de ambiente configuradas
```

### Runtime Errors
```bash
# Se app não iniciar:
1. Verificar logs no painel Railway
2. Testar endpoint /healthz
3. Validar variáveis de ambiente
```

### Performance
```bash
# Para otimizar:
1. Railway auto-scale baseado em uso
2. Considerar upgrade para plano paid se necessário
3. Monitorar métricas de performance
```

## 💰 Custos Estimados Railway

```bash
Hobby Plan (gratuito):
- $5 crédito/mês
- Suficiente para demo/teste
- Sleep após inatividade

Developer Plan ($10/mês):
- $10 crédito + $10 base
- Sem sleep
- Ideal para produção pequena

Pro Plan ($20/mês):
- $20 crédito + $20 base  
- Recursos adicionais
- Ideal para produção média
```

## 🎯 Próximos Passos

1. **Deploy inicial**: Push para main → Railway deploy automático
2. **Teste funcionalidades**: Verificar chat, editor, preview
3. **Configurar domínio**: Setup DNS personalizado
4. **Monitoramento**: Verificar logs e métricas
5. **Otimização**: Ajustar recursos conforme uso

## 📞 Suporte

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- ViBR Issues: GitHub repository issues

---

**Nota**: Esta configuração é otimizada para demo/teste. Para produção completa, considere migrar para Cloudflare conforme planejado no roadmap original.