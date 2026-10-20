// Páginas de /components. A ordem aqui é a ordem da barra lateral dentro de cada categoria.
// A API (atributos, eventos, slots…) vem do custom-elements.json do pacote; aqui fica só o texto do site.

export type CategoryId = "actions" | "forms" | "data-display" | "feedback" | "overlays" | "navigation" | "layout";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "actions", label: "Ações" },
  { id: "forms", label: "Formulários" },
  { id: "data-display", label: "Exibição de dados" },
  { id: "feedback", label: "Feedback" },
  { id: "overlays", label: "Sobreposições" },
  { id: "navigation", label: "Navegação" },
  { id: "layout", label: "Layout" },
];

export type CatalogEntry = {
  /** Pasta do componente no DS e entry point do import (`/button`). */
  slug: string;
  name: string;
  category: CategoryId;
  summary: string;
  /** Outras pastas documentadas nesta página (o `radio` só existe dentro do `radio-group`). */
  include?: string[];
};

export const CATALOG: CatalogEntry[] = [
  { slug: "button", name: "Button", category: "actions", summary: "Botão com variantes, tamanhos e estado de carregamento." },
  { slug: "toggle", name: "Toggle", category: "actions", summary: "Botão de dois estados, sozinho ou em grupo." },

  { slug: "input", name: "Input", category: "forms", summary: "Campo de texto com label, prefixo, sufixo e validação." },
  { slug: "textarea", name: "Textarea", category: "forms", summary: "Campo de texto de várias linhas." },
  { slug: "checkbox", name: "Checkbox", category: "forms", summary: "Caixa de seleção para formulários." },
  { slug: "switch", name: "Switch", category: "forms", summary: "Interruptor liga/desliga." },
  { slug: "radio-group", name: "Radio Group", category: "forms", summary: "Escolha de uma opção entre várias.", include: ["radio"] },
  { slug: "select", name: "Select", category: "forms", summary: "Lista de opções com busca e seleção múltipla." },
  { slug: "combobox", name: "Combobox", category: "forms", summary: "Campo que filtra as opções enquanto se digita." },
  { slug: "numeric-input", name: "Numeric Input", category: "forms", summary: "Número formatado com prefixo, sufixo e casas decimais." },
  { slug: "pattern-input", name: "Pattern Input", category: "forms", summary: "Campo com máscara: CPF, telefone, CEP…" },
  { slug: "date-picker", name: "Date Picker", category: "forms", summary: "Calendário para datas, intervalos e várias datas." },
  { slug: "time-picker", name: "Time Picker", category: "forms", summary: "Seleção de horário." },
  { slug: "file-upload", name: "File Upload", category: "forms", summary: "Envio de arquivos com arrastar e soltar." },
  { slug: "slider", name: "Slider", category: "forms", summary: "Controle deslizante de valor único." },
  { slug: "range-slider", name: "Range Slider", category: "forms", summary: "Intervalo com duas extremidades." },
  { slug: "otp-input", name: "OTP Input", category: "forms", summary: "Código de uso único dividido em células." },
  { slug: "rating", name: "Rating", category: "forms", summary: "Avaliação por estrelas." },

  { slug: "text", name: "Text", category: "data-display", summary: "Títulos e textos na escala tipográfica." },
  { slug: "icon", name: "Icon", category: "data-display", summary: "Todos os ícones do Lucide, um import por ícone." },
  { slug: "badge", name: "Badge", category: "data-display", summary: "Rótulo curto de status, contagem ou categoria." },
  { slug: "avatar", name: "Avatar", category: "data-display", summary: "Foto de perfil com fallback por iniciais." },
  { slug: "card", name: "Card", category: "data-display", summary: "Bloco de conteúdo com título, descrição e ações." },
  { slug: "table", name: "Table", category: "data-display", summary: "Tabela com ordenação, seleção e carregamento." },
  { slug: "pagination", name: "Pagination", category: "data-display", summary: "Navegação entre páginas." },
  { slug: "empty-state", name: "Empty State", category: "data-display", summary: "Estado vazio para listas e buscas." },
  { slug: "skeleton", name: "Skeleton", category: "data-display", summary: "Placeholder de conteúdo em carregamento." },

  { slug: "alert", name: "Alert", category: "feedback", summary: "Faixa de aviso com variantes de status." },
  { slug: "toast", name: "Toast", category: "feedback", summary: "Notificações temporárias disparadas por função." },
  { slug: "dialog", name: "Dialog", category: "feedback", summary: "Janela modal com título, conteúdo e ações." },
  { slug: "alert-dialog", name: "Alert Dialog", category: "feedback", summary: "Confirmação que exige uma resposta." },
  { slug: "sheet", name: "Sheet", category: "feedback", summary: "Painel modal que entra por uma borda da tela." },
  { slug: "progress", name: "Progress", category: "feedback", summary: "Barra de progresso determinada ou não." },
  { slug: "spinner", name: "Spinner", category: "feedback", summary: "Indicador circular de atividade." },

  { slug: "tooltip", name: "Tooltip", category: "overlays", summary: "Dica ao passar o mouse ou focar." },
  { slug: "popover", name: "Popover", category: "overlays", summary: "Painel flutuante ancorado num gatilho." },
  { slug: "dropdown-menu", name: "Dropdown Menu", category: "overlays", summary: "Menu de ações ancorado num botão." },
  { slug: "context-menu", name: "Context Menu", category: "overlays", summary: "Menu aberto pelo clique direito." },
  { slug: "hover-card", name: "Hover Card", category: "overlays", summary: "Cartão rico ao passar o mouse." },
  { slug: "command", name: "Command", category: "overlays", summary: "Paleta de comandos com busca pelo teclado." },

  { slug: "link", name: "Link", category: "navigation", summary: "Link de texto, pronto para roteamento no cliente." },
  { slug: "breadcrumb", name: "Breadcrumb", category: "navigation", summary: "Trilha de navegação hierárquica." },
  { slug: "menubar", name: "Menubar", category: "navigation", summary: "Barra de menus no estilo de aplicativo." },
  { slug: "navigation-menu", name: "Navigation Menu", category: "navigation", summary: "Navegação com links e painéis." },

  { slug: "stack", name: "Stack", category: "layout", summary: "Empilha filhos em coluna ou linha, com espaçamento." },
  { slug: "grid", name: "Grid", category: "layout", summary: "Grade responsiva de colunas." },
  { slug: "separator", name: "Separator", category: "layout", summary: "Linha divisória, com ou sem rótulo." },
  { slug: "tabs", name: "Tabs", category: "layout", summary: "Troca de painéis por abas." },
  { slug: "accordion", name: "Accordion", category: "layout", summary: "Seções expansíveis." },
  { slug: "collapsible", name: "Collapsible", category: "layout", summary: "Uma seção que abre e fecha." },
  { slug: "stepper", name: "Stepper", category: "layout", summary: "Sequência de etapas." },
  { slug: "aspect-ratio", name: "Aspect Ratio", category: "layout", summary: "Mantém a proporção do conteúdo." },
  { slug: "scroll-area", name: "Scroll Area", category: "layout", summary: "Região rolável com a barra do DS." },
];
