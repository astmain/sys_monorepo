import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"


// tb_account 表
export const tb_account = pgTable("tb_account", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).default("小许"),
    at_created: timestamp('at_created', { withTimezone: false }).defaultNow().notNull(),
    at_updated: timestamp('at_updated', { withTimezone: false }).defaultNow().notNull(),
})

