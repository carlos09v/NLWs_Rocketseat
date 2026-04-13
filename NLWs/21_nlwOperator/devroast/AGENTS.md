# DevRoast — Agentes de IA

## Visão Geral
Ferramenta de análise e "roast" de código fonte, focada em feedback brutalmente honesto e ranking de qualidade (shame leaderboard).

## Stack Tecnológica
- **Framework:** Next.js (App Router).
- **Estilização:** Tailwind CSS v4 + `tailwind-variants`.
- **UI Primitives:** Base UI.
- **Code Highlighting:** Shiki (tema Vesper).
- **Qualidade de Código:** Biome (Lint & Format).
- **Banco de Dados:** PostgreSQL + Drizzle ORM.
- **API:** tRPC (com TanStack Query para cliente e Server Callers para SSR).
- **Testes:** Playwright (E2E).

## Ferramentas de Assistência (Engenharia)
- **opencode**: Utilizando MCPs **Pencil** (análise de design `.pen`) e **Context7** (documentação técnica).

## Padrões Globais

### UI & Design
- **UI Composition:** Componentes complexos devem ser divididos em sub-componentes (ex: `CardRoot`, `CardTitle`, `CardContent`) para máxima flexibilidade.
- **Design System:** Tema *dark-first*. Use tokens de cores e espaçamentos definidos no `@theme` do CSS global.
- **Larguras (Widths):**
  - O container principal de páginas de conteúdo (como a Roast Page) deve utilizar `max-w-320` (1280px).
  - Componentes de UI (primitivos) devem ser `w-full` por padrão; a restrição de largura deve ser feita pelo container pai.
- **Tipografia:** `font-sans` para textos gerais e `font-mono` (JetBrains Mono) para código e elementos técnicos.
- **Componentes:** Use apenas *named exports* e re-exporte via `index.ts` no diretório de UI.
- **Verificação:** Sempre execute `npm run lint` após alterações para garantir a conformidade com o Biome.

### Backend & Dados (Drizzle ORM)
- **Driver**: Utilizar o driver `postgres` para conexão.
- **Casing**: Utilizar `casing: 'snake_case'` no `drizzle.config.ts`.
- **Queries**: **Proibido** o uso de `db.query` (Relational Queries). Todas as consultas devem ser feitas via SQL explícito (`db.select().from()...`) com Joins manuais.
- **Índices**: Não criar índices desnecessários; apenas Chaves Primárias e Estrangeiras.

### API (tRPC)
- **Type Safety**: Garantir tipagem end-to-end entre servidor e cliente.
- **SSR**: Utilizar **Server Callers** para chamadas de API dentro de Server Components, evitando requisições HTTP externas.
- **Client**: Utilizar hooks do tRPC integrados ao TanStack Query para gerenciamento de estado e cache.

## Fluxo de Trabalho
- **Especificações**: Qualquer nova funcionalidade ou refatoração complexa deve começar com um arquivo de especificação em `specs/*.md` seguindo as diretrizes de `specs/AGENTS.md`.
- **Implementação**: Seguir a spec $\rightarrow$ Implementar $\rightarrow$ Lint $\rightarrow$ Verificar.
