

## App Gestor - Módulo 1: Layout Frontend (Login + Dashboard)

### 1. Tema Dark Mode Premium
- Aplicar a paleta da marca: Deep Night (#0F0F0F) como fundo, Card Grey (#1A1A1A) para cards, Orange Peak (#FF6B35) para CTAs e destaques, Pure White (#FFFFFF) para títulos, Muted Silver (#BDBDBD) para textos secundários
- Tipografia: Inter para corpo, Poppins para títulos e botões
- Atualizar variáveis CSS do design system para dark mode permanente

### 2. Tela de Login
- Layout centralizado com logo "A Fonte Delivery"
- Campos de E-mail e Senha com visual dark premium
- Botão de login em laranja (Orange Peak)
- Mensagem de erro estilizada para "acesso negado" (sem lógica real, apenas o layout)

### 3. Layout Base (após login)
- **Cabeçalho Superior fixo**: Nome do operador, nome da loja, badge de status Online/Offline, status do caixa (data/hora e fundo de caixa) — tudo com dados mockados
- **Sidebar esquerda expandida** com logo no topo, navegação com ícones + texto para todos os módulos:
  - Página Inicial, Visão Geral, PDV, Rotas e Logística, Catálogo, Estoque, Financeiro, Cupons, Parceiros, Configurações
  - Os módulos que ainda não têm layout (Parceiros, Configurações e os demais além do 1) mostrarão uma página placeholder "Em breve"
  - Botão "Sair" no rodapé
- Sidebar colapsável (ícones apenas) com trigger sempre visível

### 4. Dashboard (Página Inicial)
- **Cards de resumo do mês**: Total de pedidos, métricas de atrasos, indicadores gerais — dados mockados com design premium
- **Widget lateral de Contagem Rápida**: Lista de produtos ordenados pela última contagem, com visual de checklist — dados fictícios

### 5. Componentes Reutilizáveis
- `StatusBadge` (Online/Offline, estados visuais)
- `MetricCard` (card de KPI com ícone, valor e label)
- `AppHeader` (cabeçalho global)
- `AppSidebar` (sidebar com estado expandido/colapsado)
- `PageContainer` (wrapper padrão para conteúdo de página)

