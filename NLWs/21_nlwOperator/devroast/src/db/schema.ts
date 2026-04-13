import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const issueLevelEnum = pgEnum("issue_level", [
  "critical",
  "warning",
  "good",
]);

export const roasts = pgTable("roasts", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  score: numeric("score", { precision: 3, scale: 1 }).notNull(),
  summary: text("summary").notNull(),
  verdict: text("verdict").notNull(),
  lines: integer("lines").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analysisItems = pgTable("analysis_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  roastId: uuid("roast_id")
    .notNull()
    .references(() => roasts.id, { onDelete: "cascade" }),
  level: issueLevelEnum("level").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  position: integer("position").notNull(),
});
