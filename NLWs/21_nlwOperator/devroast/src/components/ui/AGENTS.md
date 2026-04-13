# Padrões — componentes em `src/components/ui`

Este guia vale para botões, inputs e demais peças reutilizáveis entre páginas.

## Exports

- Use **apenas named exports** (`export function`, `export const`, `export type`). Não use `default export` nos componentes de UI.
- Reexporte no [`index.ts`](./index.ts) para importar de `@/components/ui`.

## TypeScript e elemento nativo

- Estenda as props do elemento HTML correspondente com `ComponentProps<"button">`, `ComponentProps<"input">`, etc.
- Componha com `VariantProps<typeof xxxVariants>` quando usar `tailwind-variants`.
- Não duplique `className` em tipos auxiliares: ele já vem de `ComponentProps`.

## Estilos: Tailwind + tailwind-variants

- Defina estilos com `tv()` de `tailwind-variants` (`base`, `variants`, `defaultVariants`).
- **Não use `twMerge` manualmente** quando o className final vier do retorno de `tv`. Passe `className` **no mesmo objeto** que `variant`, `size` e demais chaves de variante — o `tailwind-variants` faz o merge (incluindo conflitos de utilitários Tailwind). Se estiver usando slots, faça o merge com `tailwind-merge` **após** a chamada do slot, como exemplificado em `switch.tsx`.

Exemplo:

```tsx
className={buttonVariants({ variant, size, className })}
```

- Use `tailwind-merge` só onde **não** houver `tv` (por exemplo utilitários em `src/lib`), não nos componentes baseados em variants.
- Prefira utilitários numéricos nativos do Tailwind v4 (`max-w-195`, `max-w-320`, `text-13`, `w-15`, etc.) em vez de notações arbitrárias com colchetes (`max-w-[780px]`, `text-[13px]`, `w-[60px]`) sempre que a classe puder ser expressa diretamente. Isso mantém o código mais legível e consistente.

## Tipografia

- **Texto corrido (sans):** stack **do sistema** (`font-sans` em [globals.css](../../app/globals.css)); não carregar uma segunda fonte Google para UI geral.
- **Monoespaçado:** **só** JetBrains Mono como fonte externa — `font-mono` resolve para a variável `--font-jetbrains-mono` definida no layout com `next/font/google`.
- Use apenas duas famílias de fonte no código: `sans` e `mono`.
- Quando o `.pen` menciona `IBM Plex Mono` / `Geist`, implemente esses casos como `font-sans` no código, não como uma nova fonte.
- Aplique `font-mono` somente onde o design do Pencil especifica texto mono ou código; caso contrário, mantenha `font-sans`.

## Acessibilidade e comportamento

- Preserve semântica HTML; preserve ou defina defaults sensatos (`type="button"` em botões que não submetem formulário).
- Estados `focus-visible`, `disabled` e hover/active devem estar nas classes do variant/base quando fizer sentido.

## Página de referência visual

- Novos componentes devem ser adicionados em [`src/app/ui/page.tsx`](../../app/ui/page.tsx) com todas as variantes (e tamanhos, se existirem) para revisão visual rápida.

## Tokens de design

- Tema **dark-first** (valores do Pencil, ramo escuro): todas as cores e espaçamentos de tema estão no bloco **`@theme`** de [`globals.css`](../../app/globals.css), como literais (`--color-*`, `--radius-*`, `--spacing-pen-*`). Usa utilitários Tailwind (`bg-background`, `text-accent-green`, `border-border-strong`, etc.); evita `var(--…)` e hex soltos (inclusive dentro de SVGs) nos componentes. Caso a cor necessária não exista como token, adicione-a primeiramente ao bloco `@theme` de `globals.css`.
- `:root` mantém só `color-scheme: dark` e o layout injeta `--font-jetbrains-mono`. Modo claro pode voltar mais tarde com outro `@theme` ou estratégia `.dark`, sem cadeias `var` entre tokens.

## Primitivos com comportamento (Base UI)

- Para controlos com estado e acessibilidade (ex.: **Switch**), usa [**Base UI**](https://base-ui.com) (`@base-ui/react`). Compõe com `tailwind-variants` como nos outros componentes.
- Com **vários slots** (`tv({ slots: { ... } })`), o retorno pode ser função por slot — chama `root()` / `thumb()` e, se precisares de `className` extra por slot, faz merge com `tailwind-merge` **depois** da chamada (ver [`switch.tsx`](./switch.tsx)).

## CodeBlock (Shiki)

- [`code-block.tsx`](./code-block.tsx) é **sempre server component**: sem `"use client"`, highlight com Shiki e tema **vesper**.
- Unifica a moldura de editor (chrome) com o realce de sintaxe.
- **Props:** `code`, `lang`, `filename?`, `className?`.
- Utiliza `tv` com slots (`root`, `header`, `gutter`, `content`) para a estrutura da janela.
- Não importes `CodeBlock` dentro de Client Components sem dividir a árvore (ex.: página ou layout server que renderiza o bloco, ou composição com `children` gerados no servidor).
