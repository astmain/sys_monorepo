import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

// 1. tb_test1 表
export const tb_test1 = pgTable("tb_test1", {
  // id 字段，自增主键
  id: serial("id").primaryKey(),
  // name 字段，字符串类型
  name: varchar("name", { length: 255 }),
})

