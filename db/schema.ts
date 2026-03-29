import { sqliteTable, text, integer, index } from "void/schema-d1";
import { sql } from "void/db";

export const statuses = sqliteTable(
  "statuses",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    server: text("server").notNull(),
    type: text("type").notNull(),
    message: text("message").notNull(),
    comment: text("comment"),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [index("idx_statuses_server_created").on(table.server, table.createdAt)],
);
