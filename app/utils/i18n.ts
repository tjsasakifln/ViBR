/**
 * Sistema de internacionalização ViBR
 * Textos em português brasileiro para toda a interface
 */

export const pt_BR = {
  // Header e Navegação
  "app.title": "ViBR - AI do Vibe Coder Brasileiro",
  "app.description": "Desenvolva aplicações completas com IA, direto no navegador - 100% em português",
  "app.tagline": "O primeiro assistente de código que fala a sua língua",
  
  // Chat e Interação
  "chat.placeholder": "Descreva o app que você quer criar... Ex: 'Quero um sistema de cadastro com React'",
  "chat.send": "Enviar",
  "chat.thinking": "Pensando...",
  "chat.generating": "Gerando código...",
  "chat.welcome": "Olá! Sou a ViBR, sua assistente de código brasileira. Como posso te ajudar hoje?",
  "chat.example1": "Criar um app de to-do list com React",
  "chat.example2": "Fazer uma API REST com Node.js",
  "chat.example3": "Desenvolver um dashboard com gráficos",
  
  // Actions e Comandos
  "action.create_file": "Criando arquivo",
  "action.edit_file": "Editando arquivo", 
  "action.run_command": "Executando comando",
  "action.install_deps": "Instalando dependências",
  "action.preview": "Visualizando resultado",
  "action.terminal": "Abrindo terminal",
  "action.download": "Baixar projeto",
  "action.share": "Compartilhar",
  
  // Interface do Editor
  "editor.file_tree": "Arquivos do Projeto",
  "editor.code_editor": "Editor de Código",
  "editor.preview": "Visualização",
  "editor.terminal": "Terminal",
  "editor.console": "Console",
  "editor.save": "Salvar",
  "editor.run": "Executar",
  "editor.stop": "Parar",
  
  // Workbench
  "workbench.no_project": "Nenhum projeto aberto",
  "workbench.create_project": "Criar novo projeto",
  "workbench.loading": "Carregando projeto...",
  "workbench.error": "Erro ao carregar projeto",
  
  // Estados e Feedback
  "status.connected": "Conectado",
  "status.disconnected": "Desconectado", 
  "status.loading": "Carregando...",
  "status.success": "Sucesso!",
  "status.error": "Ops! Algo deu errado",
  
  // Erros Comuns
  "error.api_key": "Chave da API inválida ou expirada",
  "error.network": "Erro de conexão - verifique sua internet",
  "error.generic": "Ops! Algo deu errado. Tente novamente",
  "error.file_too_large": "Arquivo muito grande",
  "error.invalid_format": "Formato de arquivo inválido",
  
  // Botões e Ações
  "button.cancel": "Cancelar",
  "button.confirm": "Confirmar", 
  "button.close": "Fechar",
  "button.save": "Salvar",
  "button.delete": "Excluir",
  "button.edit": "Editar",
  "button.copy": "Copiar",
  "button.download": "Baixar",
  "button.share": "Compartilhar",
  "button.try_again": "Tentar novamente",
  
  // Contexto Brasileiro
  "context.hosting_suggestion": "Para hospedagem, recomendo Vercel, Netlify ou Locaweb",
  "context.payment_suggestion": "Para pagamentos, considere integrar com Mercado Pago ou PagSeguro",
  "context.database_suggestion": "Para banco de dados, que tal PostgreSQL na Supabase ou Railway?",
  "context.deployment_tip": "Dica: Use variáveis de ambiente para suas chaves de API",
  
  // Gírias e Expressões Brasileiras (para a IA usar)
  "slang.positive": ["massa", "show", "perfeito", "top", "bacana", "legal", "maneiro"],
  "slang.agreement": ["beleza", "fechou", "combinado", "vamos nessa", "bora"],
  "slang.encouragement": ["vai dar bom", "confia", "tamo junto", "você consegue"],
  "slang.working": ["trabalhando aqui", "mexendo no código", "dando uma ajeitada"],
  
  // Tipos de Projeto
  "project.webapp": "Aplicação Web",
  "project.api": "API REST",
  "project.mobile": "App Mobile",
  "project.dashboard": "Dashboard",
  "project.ecommerce": "E-commerce",
  "project.blog": "Blog",
  "project.portfolio": "Portfólio",
  
  // Tecnologias Populares no Brasil
  "tech.frontend": "React, Next.js, Vue.js",
  "tech.backend": "Node.js, Express, Fastify",
  "tech.database": "PostgreSQL, MongoDB, MySQL",
  "tech.hosting": "Vercel, Netlify, Railway, Locaweb",
  "tech.payment": "Mercado Pago, PagSeguro, Stripe",
} as const;

export type TranslationKey = keyof typeof pt_BR;

/**
 * Função para obter tradução
 */
export function t(key: TranslationKey): string {
  return pt_BR[key] || key;
}

/**
 * Função para obter tradução com interpolação
 */
export function tWithParams(key: TranslationKey, params: Record<string, string>): string {
  let text = t(key);
  
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(`{${param}}`, value);
  });
  
  return text;
}

/**
 * Hook para usar traduções em componentes React
 */
export function useTranslation() {
  return { t, tWithParams };
}

/**
 * Função para obter uma gíria aleatória
 */
export function getRandomSlang(type: 'positive' | 'agreement' | 'encouragement' | 'working'): string {
  const slangKey = `slang.${type}` as TranslationKey;
  const slangs = pt_BR[slangKey] as string[];
  return slangs[Math.floor(Math.random() * slangs.length)];
}