# Especificação: Implementação do Drizzle ORM

Este documento define o esquema do banco de dados e o plano de implementação para a integração do Drizzle ORM e PostgreSQL no DevRoast.

## 1. Modelo de Dados

Com base na análise visual do design (`devroast.pen`) e nos requisitos do projeto, as seguintes entidades são necessárias.

### 1.1 Tabelas

#### `roasts`
Armazena a submissão principal e o resultado geral do "roast".

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Default: `gen_random_uuid()` | Identificador único do roast. |
| `code` | `text` | Não Nulo | O código fonte enviado pelo usuário. |
| `language` | `text` | Não Nulo | A linguagem de programação do código. |
| `score` | `numeric` | Não Nulo | Pontuação de qualidade (ex: 3.5). |
| `summary` | `text` | Não Nulo | A frase/título brutal do resumo. |
| `verdict` | `text` | Não Nulo | O veredito geral (ex: "needs_serious_help"). |
| `lines` | `integer` | Não Nulo | Número total de linhas do código enviado. |
| `created_at` | `timestamp` | Default: `now()` | Timestamp de criação do roast. |

**SQL de Referência:**
```sql
CREATE TABLE roasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  score NUMERIC NOT NULL,
  summary TEXT NOT NULL,
  verdict TEXT NOT NULL,
  lines INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

#### `analysis_items`
Armazena os itens detalhados da análise para cada roast.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Chave Primária, Default: `gen_random_uuid()` | Identificador único do item. |
| `roast_id` | `uuid` | Chave Estrangeira $\rightarrow$ `roasts(id)`, On Delete: `cascade` | Link para o roast pai. |
| `level` | `issue_level` | Não Nulo | Nível de severidade do item. |
| `title` | `text` | Não Nulo | Título breve do item. |
| `description` | `text` | Não Nulo | Explicação detalhada do item. |
| `position` | `integer` | Não Nulo | Ordem do item na lista de análise. |

**SQL de Referência:**
```sql
CREATE TABLE analysis_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roast_id UUID NOT NULL REFERENCES roasts(id) ON DELETE CASCADE,
  level issue_level NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  position INTEGER NOT NULL
);
```

### 1.2 Enums

#### `issue_level`
Define os níveis de severidade para os itens de análise.
- `critical`
- `warning`
- `good`

**SQL de Referência:**
```sql
CREATE TYPE issue_level AS ENUM ('critical', 'warning', 'good');
```

---

## 2. Arquivos de Configuração

### 2.1 `.env`
Deve conter a string de conexão com o PostgreSQL:
```env
DATABASE_URL=postgres://user:password@localhost:5432/devroast
```

### 2.2 `drizzle.config.ts`
Configuração do Drizzle Kit para migrações e introspecção:
- **Dialect**: `postgresql`
- **Schema**: `./src/db/schema.ts`
- **Casing**: `snake_case` (para mapear camelCase do TS para snake_case do SQL automaticamente).

---

## 3. Plano de Implementação

### 3.1 Infraestrutura (Docker)
- [ ] Criar arquivo `docker-compose.yml` para orquestrar:
    - **PostgreSQL**: Imagem oficial, configurada com variáveis de ambiente `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB`.
- [ ] Configurar arquivo `.env` com a `DATABASE_URL`.

### 3.2 Configuração do Drizzle ORM
- [ ] Instalar dependências:
    - `npm install drizzle-orm postgres`
    - `npm install -D drizzle-kit`
- [ ] Criar `drizzle.config.ts` com a configuração de casing.
- [ ] Implementar um cliente de banco de dados singleton em `src/db/index.ts`.

### 3.3 Esquema e Migrações
- [ ] Definir o esquema em `src/db/schema.ts` utilizando as especificações acima.
- [ ] Configurar script de migração ou utilizar `drizzle-kit push` para prototipagem rápida.
- [ ] Estabelecer fluxo de migrações para produção utilizando `drizzle-kit generate` e um executor de migrações customizado.

### 3.4 Integração com a Aplicação
- [ ] Criar camada de serviço para gerenciar:
    - Salvamento de um novo roast e seus itens associados (Transação).
    - Busca de um roast por ID.
    - Busca do "Shame Leaderboard" (Ordenado por score ascendente).
