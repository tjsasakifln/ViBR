[![ViBR - AI do Vibe Coder Brasileiro](./public/social_preview_index.jpg)](https://vibr.dev)

> Bem-vindo à base de código da **ViBR**! Este repositório contém a primeira assistente de IA para desenvolvimento de software **100% em português brasileiro**, construída para a comunidade dev brasileira.

### Por Que Usar ViBR

A ViBR foi criada especificamente para desenvolvedores brasileiros, combinando o poder da IA com um ambiente de desenvolvimento no navegador que entende nosso jeito de trabalhar. Com a ViBR você pode **criar, executar, editar e fazer deploy** de aplicações full-stack diretamente no navegador, com interface e assistente que falam português brasileiro de verdade.

### O Que Torna a ViBR Especial

- **100% em Português**: Interface, IA e documentação completamente em português brasileiro
- **Contexto Brasileiro**: Exemplos com CEP, CPF, preços em R$, hospedagens nacionais
- **Gírias Naturais**: A IA fala como brasileiro ("massa", "show", "beleza", "vamos nessa")
- **Ferramentas Locais**: Integração com Mercado Pago, PagSeguro, Locaweb
- **Comunidade BR**: Criado por e para a comunidade de desenvolvedores brasileiros

# Começando com ViBR

A ViBR combina IA com ambientes de desenvolvimento sandbox para criar uma experiência colaborativa onde código pode ser desenvolvido pela assistente e pelo programador juntos. ViBR utiliza [WebContainer API](https://webcontainers.io/api) com [Claude Sonnet 3.5](https://www.anthropic.com/news/claude-3-5-sonnet) usando [Remix](https://remix.run/) e [AI SDK](https://sdk.vercel.ai/).

### WebContainer API

ViBR usa [WebContainers](https://webcontainers.io/) para executar código gerado no navegador. WebContainers oferecem um ambiente sandbox full-stack usando [WebContainer API](https://webcontainers.io/api). WebContainers executam aplicações full-stack diretamente no navegador sem os custos e preocupações de segurança de agentes de IA hospedados na nuvem.

### Aplicação Remix

ViBR é construída com [Remix](https://remix.run/) e pode ser deployada usando [CloudFlare Pages](https://pages.cloudflare.com/), [Vercel](https://vercel.com/) ou [CloudFlare Workers](https://workers.cloudflare.com/).

### Integração AI SDK

ViBR usa o [AI SDK](https://github.com/vercel/ai) para integrar com modelos de IA. Atualmente, ViBR suporta Anthropic Claude Sonnet 3.5. Você pode obter uma chave API no [Console da API Anthropic](https://console.anthropic.com/) para usar com ViBR.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (v20.15.1)
- pnpm (v9.4.0)

## Configuração

1. Clone o repositório:

```bash
git clone https://github.com/confenge/vibr.git
cd vibr
```

2. Instale as dependências:

```bash
pnpm install
```

3. Crie um arquivo `.env.local` no diretório raiz e adicione sua chave API da Anthropic:

```
ANTHROPIC_API_KEY=XXX
```

Opcionalmente, você pode definir o nível de debug:

```
VITE_LOG_LEVEL=debug
```

**Importante**: Nunca commit seu arquivo `.env.local` para controle de versão. Ele já está incluído no .gitignore.

## Scripts Disponíveis

- `pnpm run dev`: Inicia o servidor de desenvolvimento.
- `pnpm run build`: Faz o build do projeto.
- `pnpm run start`: Executa a aplicação construída localmente usando Wrangler Pages.
- `pnpm run preview`: Faz build do projeto e depois inicia localmente, útil para testar o build de produção.
- `pnpm test`: Executa a suíte de testes usando Vitest.
- `pnpm run typecheck`: Executa verificação de tipos TypeScript.
- `pnpm run typegen`: Gera tipos TypeScript usando Wrangler.
- `pnpm run deploy`: Faz build do projeto e deploya para Cloudflare Pages.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
pnpm run dev
```

Isso iniciará o servidor de desenvolvimento Remix Vite.

## Testes

Execute a suíte de testes com:

```bash
pnpm test
```

## Deploy

Para fazer deploy da aplicação:

```bash
pnpm run deploy
```

Certifique-se de ter as permissões necessárias e Wrangler está corretamente configurado para sua conta Cloudflare.

## Contribuindo

Valorizamos contribuições da comunidade brasileira! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade massa'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- **Português Brasileiro**: Todo código, comentários e documentação devem estar em português brasileiro
- **Gírias Naturais**: Use gírias brasileiras naturalmente nos textos da interface
- **Contexto Local**: Prefira exemplos e referências brasileiras
- **Código Limpo**: Siga as convenções de código TypeScript/React
- **Testes**: Inclua testes para novas funcionalidades

## Licença

Copyright © 2025 Confenge Avaliações e Inteligência Artificial LTDA. Todos os direitos reservados.

---

**Feito com ❤️ pela comunidade dev brasileira** 🇧🇷