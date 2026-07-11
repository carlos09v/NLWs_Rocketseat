# Changes.md
Obs: gerado pelo Github Copilot no modelo GPT-5.4 mini.

## Contexto
Este documento resume as mudanças mais relevantes no projeto DevRoast entre a versão anterior da base (até a aula 2, com IA gratuita própria) e a versão nova (completo, seguindo o código do repositório oficial) que está no workspace agora. O foco está nas áreas que realmente alteraram a estrutura do app: `src/app`, `src/components`, `src/trpc`, `src/db` e as dependências do projeto.

## Versão anterior

### App Router e páginas
- A home era mais simples e mais próxima de uma página de demonstração.
- O preview do leaderboard e as métricas tinham composição menos fragmentada.
- Não existia a mesma separação atual entre editor, stats, leaderboard preview, skeleton e resultado final.
- A navegação tinha menos páginas auxiliares e menos pontos de entrada de conteúdo.

### Componentes
- O editor era mais contido e com menos responsabilidades externas.
- A UI base tinha menos componentes especializados para cards, diff, score, leaderboard e análise.
- O leaderboard era apresentado de forma mais estática.
- Não havia a mesma ênfase em componentes de composição visual reutilizáveis.

### tRPC
- A camada de API era mais enxuta, centrada em métricas básicas.
- O suporte a prefetch, hydration e server caller ainda não estava estruturado no padrão atual.
- A integração com React Query existia de forma mais simples e com menos camadas de abstração.

### Banco de dados
- O schema era menor, com foco principal em `roasts` e `analysis_items`.
- Não existiam as novas entidades de tracking de usuário e perfil.
- A modelagem tinha menos campos derivando o resultado da análise e menos enums de domínio.

### Dependências
- A stack era mais curta, com menos integrações para IA, formulário e experiência de client side.
- Não havia o mesmo conjunto de dependências para `@trpc/tanstack-react-query`, IA, formulário e telefone.

## Versão nova

### App Router e páginas
- A home foi quebrada em blocos mais claros: editor, estatísticas, preview do leaderboard e fallback de carregamento.
- Passou a existir uma página de resultado individual em `roast/[id]`, com score, verdict, quote, análise detalhada e diff sugerido.
- Foram adicionadas páginas institucionais de termos e privacidade.
- O projeto ganhou uma página de showcase de componentes, útil como referência visual da biblioteca interna.
- O fluxo de metadata foi reforçado com geração dinâmica e preview social na página do roast.
- A navegação do app ficou mais próxima de um produto completo e menos de uma demo isolada.

### Componentes
- O editor principal foi movido para um componente próprio, com detecção de linguagem, highlight, limite de caracteres e estado de roast mode.
- O modal de perfil de usuário passou a capturar nome, email, telefone e nível de experiência, com validação de formulário.
- O navbar ganhou links para leaderboard, termos e privacidade.
- A UI foi decomposta em componentes mais específicos como `CodeBlock`, `ScoreRing`, `AnalysisCard`, `DiffLine`, `Badge`, `Button` e `LeaderboardRow`.
- O leaderboard passou a ter colapso progressivo para trechos grandes de código.
- A experiência visual ficou mais consistente com destaque forte para código, estados e feedback de análise.

### Hooks e utilitários de domínio
- Entraram hooks dedicados para separar responsabilidade de estado e lógica do editor.
- `use-language-detection` passou a concentrar a auto-detecção de linguagem com `highlight.js`, debounce e threshold de confiança.
- `use-shiki-highlighter` passou a encapsular o Shiki client-side com singleton, engine JavaScript e carregamento sob demanda das linguagens.
- `use-user-tracking` passou a cuidar do ciclo de sessão, contagem de requests, exibição do modal e fluxo de liberação para o roast result.

### Libs centrais
- `lib/languages.ts` passou a centralizar o catálogo de linguagens suportadas, unificando nome exibido, ID do Shiki, ID do highlight.js e prioridade de carregamento.
- `lib/ai.ts` passou a concentrar a configuração da IA, o schema de saída e o prompt usado para gerar roast, verdict e sugestão de correção.
- `lib/hubspot.ts` isolou a sincronização de contatos e dados de perfil com o HubSpot.

### Editor com syntax highlight
- Foi adicionada a spec `specs/code-editor-syntax-highlights.md`, documentando a evolução do editor para textarea overlay com syntax highlight client-side.
- A spec registra a decisão de usar Shiki para renderização e highlight.js apenas para auto-detecção.
- Também documenta o subset de linguagens, o tradeoff de bundle e os riscos de scroll sync, performance e falsos positivos.

### tRPC
- A base do tRPC foi reorganizada para trabalhar com `init.ts`, `query-client.ts`, `client.tsx` e `server.tsx`.
- O servidor agora expõe `caller`, `prefetch`, `HydrateClient` e `createTRPCOptionsProxy`.
- O client usa `TRPCReactProvider` com `QueryClientProvider` e `httpBatchLink`.
- As queries do front passaram a ser consumidas com hydration e cache mais explícitos.
- O router de roast virou o núcleo da API, com procedimentos para métricas, leaderboard, criação de roast, leitura por ID e tracking de perfil.
- A camada passou a depender mais fortemente de SSR/RSC e de sincronização com React Query.

### Banco de dados
- O schema foi expandido para refletir melhor o domínio do produto.
- A tabela `roasts` ganhou campos como `lineCount`, `roastMode`, `score`, `verdict`, `roastQuote`, `suggestedFix` e `createdAt` com timezone.
- A tabela `analysis_items` passou a registrar itens de análise com severidade, título, descrição e ordem.
- Surgiram enums de domínio para `verdict`, `severity` e `programmingLevel`.
- Foi adicionada a tabela `userProfiles`, que armazena dados de sessão, contato, contagem de requests e vínculo com HubSpot.
- Foram introduzidos índices explícitos para `roasts.score` e `userProfiles.sessionId`.
- O acesso ao banco foi padronizado com `drizzle-orm/node-postgres` e `casing: "snake_case"`.

### Dependências
- Entraram dependências para o novo fluxo de dados e interface: `@trpc/tanstack-react-query`, `ai`, `react-hook-form`, `react-phone-number-input`, `server-only` e `client-only`.
- A base continua com Next.js, React 19, tRPC, Drizzle ORM, Shiki, Tailwind Variants, Tailwind CSS v4 e Biome.
- O projeto agora está mais acoplado a integrações de IA e formulário, o que amplia capacidade funcional e também aumenta a superfície de manutenção.

### CSS e integração de terceiros
- O import de `react-phone-number-input/style.css` em `globals.css` é válido, porque o pacote exporta esse arquivo de estilo.
- O erro de resolução no `run dev` não significa que a dependência está ausente; ele costuma vir de cache/resolução do bundler ou da forma como o CSS global está sendo processado.
- O arquivo de estilos do pacote existe no `node_modules`, então a correção tende a estar no fluxo de build e não na instalação da dependência.

## Impacto prático
- A aplicação deixou de ser uma demonstração visual e passou a se comportar como um produto com fluxo real de submissão, análise, persistência e compartilhamento.
- O frontend ficou mais modular e mais fácil de evoluir por áreas.
- O backend passou a refletir melhor os dados reais do produto e o tracking de usuário.
- A infraestrutura ficou mais avançada, mas também mais sensível a inconsistências de migração entre paths, dependências e módulos ainda em consolidação.

## Observações relevantes
- A mudança é grande o suficiente para ser tratada como migração de arquitetura, não só refactor visual.
- Existe ganho claro de organização e escalabilidade.
- Também existe aumento de complexidade, especialmente em tRPC, hydration e schema do banco.
- Esse arquivo deve ser atualizado sempre que novas mudanças estruturais entrarem no projeto.