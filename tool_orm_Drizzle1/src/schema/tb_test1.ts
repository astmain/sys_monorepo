import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

// 1. tb_test1 表
export const tb_test1 = pgTable("tb_test1", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
})

