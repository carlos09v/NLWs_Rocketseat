# Padrões — Banco de Dados (`src/db`)

Este guia define as regras de persistência e acesso a dados utilizando Drizzle ORM e PostgreSQL.

## Configuração e Conexão
- **Driver**: Utilizar exclusivamente o driver `postgres` para conexão.
- **Casing**: Utilizar `casing: 'snake_case'` no arquivo `drizzle.config.ts` para garantir a conversão automática entre `camelCase` (TypeScript) e `snake_case` (SQL).

## Modelagem de Dados (Schema)
- **Tipagem**: Definir esquemas rigorosos no `schema.ts`.
- **Índices**: Não criar índices redundantes. Priorizar a criação de Chaves Primárias (`primaryKey`) e Estrangeiras (`foreignKey`) para garantir a integridade referencial.
- **Enums**: Utilizar `pgEnum` para campos com valores fixos e conhecidos.

## Padrões de Consulta (Queries)
- **Proibição de Relational Queries**: É estritamente **proibido** o uso de `db.query` (Relational Queries do Drizzle).
- **SQL Explícito**: Todas as consultas devem ser implementadas via SQL explícito utilizando a API core do Drizzle (`db.select().from()...`).
- **Joins**: Utilizar Joins manuais (`.leftJoin()`, `.innerJoin()`) para relacionar tabelas, garantindo controle total sobre a performance da query.

## Migrações
- Utilizar o `drizzle-kit` para gerar e aplicar migrações.
- Validar cada migração gerada antes de aplicá-la ao banco de dados de produção/desenvolvimento.
