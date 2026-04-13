# Padrões — Camada de Aplicação (`src/app`)

Este guia define as regras para a implementação de rotas, layouts e a integração com a camada de API no Next.js App Router.

## Estrutura de Páginas e Layouts
- **Server Components por Padrão**: Todos os componentes em `src/app` devem ser Server Components a menos que necessitem de interatividade (hooks, eventos), caso em que devem ser movidos para componentes menores com a diretiva `"use client"`.
- **Layouts**: Utilizar `layout.tsx` para elementos persistentes e evitar re-renderizações desnecessárias.
- **Roteamento Dinâmico**: Utilizar pastas com colchetes (ex: `[id]`) para rotas dinâmicas, garantindo a tipagem do parâmetro `params`.

## Integração com API (tRPC)

### Server Components (SSR)
- **Server Callers**: Para buscar dados em Server Components, utilize o **Server Caller** do tRPC. 
- **Vantagem**: Isso permite a invocação direta de procedimentos do servidor sem realizar requisições HTTP externas, reduzindo a latência e simplificando a autenticação.
- **Padrão**: `const data = await trpcServer.roast.getById({ id });`

### Client Components
- **Hooks do tRPC**: Utilizar `trpc.useQuery` e `trpc.useMutation` integrados ao TanStack Query.
- **Gerenciamento de Estado**: Confiar no cache do TanStack Query para evitar requisições redundantes.
- **Feedback de UI**: Sempre implementar estados de `isLoading` e `isError` para proporcionar uma boa experiência ao usuário.

## Performance e Otimização
- **Streaming**: Utilizar `loading.tsx` ou `Suspense` para carregar partes da página de forma independente.
- **Data Fetching**: Buscar dados o mais próximo possível de onde eles são utilizados para minimizar o "waterfall" de requisições.
- **Imagens**: Utilizar o componente `next/image` para otimização automática de assets.

## Verificação
- Garantir que todas as rotas dinâmicas possuem tratamento de erro (ex: `notFound()` do `next/navigation`) para IDs inválidos.
- Validar que não existam chamadas de API via `fetch` manual para endpoints internos quando o tRPC estiver disponível.
