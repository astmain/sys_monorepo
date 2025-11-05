import { Entity, PrimaryColumn, Column } from 'typeorm'
import { tb_test1_zod_i } from '../tb_type/tb_test1_zod'

// 定义构造函数参数类型，只允许 name 和 id 字段
type TbTest1ConstructorData = {
  id?: string
  name?: string
}

@Entity('tb_test1')
export class tb_test1 implements tb_test1_zod_i {
  @PrimaryColumn({ type: 'varchar', comment: '主键ID，可以是自定义字符串' })
  id?: string

  @Column({ comment: '名称' })
  name: string

  constructor(data?: TbTest1ConstructorData) {
    if (data) {
      // 只赋值实体中存在的字段
      if ('id' in data && data.id !== undefined) {
        this.id = data.id
      } else {
        // 如果没有提供 ID，自动生成一个字符串 ID
        this.id = Date.now().toString() + '_' + Math.random().toString(36).substring(2, 11)
      }
      if ('name' in data && data.name !== undefined) {
        this.name = data.name
      }
    } else {
      // 如果没有传入任何数据，也生成一个默认 ID
      this.id = Date.now().toString() + '_' + Math.random().toString(36).substring(2, 11)
    }
  }
}
