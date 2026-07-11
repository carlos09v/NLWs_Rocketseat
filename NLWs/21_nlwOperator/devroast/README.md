# 🚀 DevRoast

O **DevRoast** é uma ferramenta para colar código, receber uma avaliação brutalmente honesta e comparar o resultado com o ranking global da vergonha alheia na programação.

O projeto combina uma experiência visual de editor/terminal com um fluxo completo de análise, persistência, tracking de sessão e leaderboard. A ideia é simples: enviar o código, gerar o roast com IA, salvar o resultado no banco e exibir métricas, análise detalhada e ranking em uma interface que parece metade editor, metade painel de punição.

## ✨ Funcionalidades

- **Code Roasting:** Análise automática de código com feedbacks sarcásticos e diretos.
- **Score de Qualidade:** Receba uma nota baseada na qualidade (ou falta dela) do seu código.
- **Shame Leaderboard:** Um ranking global dos códigos mais "criminosos" da internet.
- **Visual Tech:** Interface inspirada em editores de código modernos e terminais.

## 🧩 Stack do Projeto

### Frontend

- **Next.js 16** com **App Router** para páginas, layouts, metadata dinâmica e rotas por resultado do roast.
- **React 19** com composição entre Server Components e Client Components para separar renderização e interatividade.
- **tRPC 11** + **@trpc/tanstack-react-query** para tipagem fim a fim entre front e back, com cache e hydration.
- **TanStack Query 5** no cliente para cache, mutations e sincronização dos dados do roast.
- **Tailwind CSS v4** + **tailwind-variants** para o sistema visual dark-first e componentes com variantes.
- **Base UI** para primitives acessíveis, como switches e controles com estado.
- **Shiki** com o tema **Vesper** para syntax highlight no editor e nos blocos de código.
- **highlight.js** para auto-deteção de linguagem no editor client-side.
- **NumberFlow** para animações de números nas métricas e score.

### Backend

- **tRPC** para expor a API com tipagem fim a fim entre servidor e cliente.
- **Next.js Route Handlers** para publicar o endpoint HTTP em `/api/trpc`.
- **Drizzle ORM** para acesso ao banco com consultas SQL explícitas.
- **PostgreSQL** como camada de persistência para roasts, itens de análise, sessões e perfis.
- **Zod** para validação tipada da entrada nas procedures.
- **pg** como driver de conexão com o banco.
- **ai** + **@ai-sdk/openai** para geração do roast, verdict, quote e suggested fix.
- **react-hook-form** + **@hookform/resolvers** para validação e submissão do modal de perfil.
- **react-phone-number-input** para captura de telefone com suporte a formatação.
- **@takumi-rs/image-response** para geração de imagens OG/Open Graph.

### Banco e Modelo de Dados

- **roasts** guarda o código enviado, a linguagem detectada, a nota, o veredito, a quote e a sugestão de correção.
- **analysis_items** registra os pontos do roast por nível de severidade, ligados ao roast principal.
- **user_profiles** armazena sessão, contato, nível de experiência e integração com HubSpot.
- O schema usa enums, chaves estrangeiras e índices seletivos para manter integridade e consistência entre análises e registros.

## 🛠️ Ferramentas de Desenvolvimento

- **Biome** para lint e formatação.
- **Playwright** para testes de ponta a ponta (E2E).
- **opencode** com MCPs **Pencil** para estudo de design e **Context7** para consulta de documentação.
- **Docker Compose** para subir o PostgreSQL local.


## 🎓 Contexto

Este projeto foi desenvolvido durante o **NLW (Next Level Week)** da **Rocketseat**, seguindo as aulas e desafios propostos durante o evento.

## 📌 Resumo rápido da arquitetura

- A página principal reúne editor, métricas e leaderboard preview em uma experiência só.
- O resultado do roast tem página própria com score, veredito, análise detalhada e diff sugerido.
- O frontend conversa com o backend por tRPC com prefetch e hydration, sem chamadas manuais para rotas internas.
- O backend consulta o banco via Drizzle, gera roast com IA e persiste métricas, análises e perfis.
- O leaderboard combina componentes visuais reutilizáveis com blocos de código destacados para manter o clima de "roast".

---
Feito com ☕ e muito sarcasmo.
