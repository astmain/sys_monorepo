import 'reflect-metadata'
import { db1, db1_connect } from './db1'
import { tb_test1 } from './entity/tb_test1'

export async function tool_db_init_entity() {
  try {
    if (!db1_connect.isInitialized) {
      await db1_connect.initialize()
      console.log('数据库连接成功')
    }
  } catch (error) {
    console.error('数据库连接失败:', error)
    throw error
  }
}

export const db_typeorm = db1
export { tb_test1 } from './entity/tb_test1'
export { tb_test1_zod, tb_test1_zod_i } from './tb_type/tb_test1_zod'
