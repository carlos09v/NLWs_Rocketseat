# Implementação do tRPC

## Visão Geral
Implementar o tRPC como a camada de API do projeto para garantir comunicação tipada (end-to-end type safety) entre o frontend e o backend, integrando-o nativamente com o Next.js App Router, suportando tanto Server Components quanto Client Components.

## Requisitos
- **Tipagem End-to-End**: Mudanças no esquema do servidor devem refletir automaticamente no cliente.
- **SSR / Server Components**: Capacidade de realizar chamadas de API diretamente em Server Components sem a necessidade de requisições HTTP externas (usando callers internos).
- **Client Components**: Integração com TanStack Query para gerenciamento de estado, cache e revalidação no lado do cliente.
- **Arquitetura Modular**: Roteadores organizados por domínios para facilitar a manutenção.
- **Configuração Simplificada**: Setup de infraestrutura que minimize a boilerplate em cada nova rota.

## Abordagem Técnica

### 1. Dependências
Instalação das bibliotecas necessárias:
- `@trpc/server`, `@trpc/client`, `@trpc/react-query`
- `@tanstack/react-query`
- `zod` (para validação de inputs)

### 2. Core do tRPC
- **`src/server/trpc.ts`**: Inicialização do tRPC usando `initTRPC.create()`.
- **`src/server/routers/`**: Criação de roteadores específicos (ex: `roastRouter`, `userRouter`) que serão agregados em um `appRouter` central.
- **API Route**: Implementação do handler em `src/app/api/trpc/[trpc]/route.ts` para expor a API via HTTP.

### 3. Integração com Next.js

#### Server Components (SSR)
- **Server Caller**: Implementação de um "caller" servidor (`src/server/trpc-server.ts`) que permite invocar os procedimentos do roteador diretamente no servidor, evitando a latência de chamadas HTTP (`http://localhost:3000/api/trpc...`).
- **Uso**: Utilizar o caller dentro de funções `async` em Server Components para buscar dados iniciais.

#### Client Components
- **tRPC Client**: Configuração do `createTRPCNext` ou `createTRPCClient` para criar o hook de consulta.
- **Provider**: Criação de um `TRPCProvider` que envolve a aplicação (ou partes dela) com o `QueryClientProvider` do TanStack Query.
- **Hooks**: Uso de `trpc.useQuery` e `trpc.useMutation` para interações dinâmicas no cliente.

### 4. Fluxo de Dados
`Client Component` $\rightarrow$ `tRPC Client` $\rightarrow$ `API Route` $\rightarrow$ `tRPC Router` $\rightarrow$ `Drizzle ORM` $\rightarrow$ `Database`
`Server Component` $\rightarrow$ `tRPC Server Caller` $\rightarrow$ `tRPC Router` $\rightarrow$ `Drizzle ORM` $\rightarrow$ `Database`

## Verificação
1. **Teste de Sanidade**: Criar um procedimento `hello` no `appRouter` que retorna uma string.
2. **Validação SSR**: Implementar uma página de teste que utilize o server caller para exibir a mensagem do `hello` no servidor.
3. **Validação Cliente**: Implementar um botão que dispara uma mutation do tRPC e atualiza a UI via TanStack Query.
4. **Teste de Tipagem**: Alterar o retorno do procedimento `hello` no servidor e verificar se o TypeScript aponta erros nos componentes que o utilizam.
