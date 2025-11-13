import postgres from "postgres"
import * as drizzle_orm from "drizzle-orm/postgres-js"
import * as schema from "./schema/index"

// 数据库连接字符串
const connection_string = "postgresql://root:123456@103.119.2.223:2007/back"

// 创建 postgres 客户端
const client = postgres(connection_string)

// 创建 drizzle 数据库实例
export const db = drizzle_orm.drizzle(client, { schema })

// 导出客户端，用于关闭连接
export const db_client = client

