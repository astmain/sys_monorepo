import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"
import { id_str, at_created, at_updated } from "../common"

// 1. tb_test1 表
export const tb_test2 = pgTable("tb_test2", {
    id: id_str,
    name: varchar("name", { length: 255 }),
    age: integer("age"),
})


import type { z } from 'zod'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'

export const tb_test2_schema = createSelectSchema(tb_test2)
export type tb_test2_infer = z.infer<typeof tb_test2_schema>
