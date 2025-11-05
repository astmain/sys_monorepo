import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { tb_test1_zod_i } from '../tb_type/tb_test1_zod'

// 严格类型，只允许传入已定义的字段，不允许额外属性
type Exact<T> = {
  [K in keyof T]: T[K]
} & {
  [K in Exclude<string, keyof T>]?: never
}

// 定义构造函数参数类型，只允许 name 和 id 字段
type TbTest1ConstructorData = Exact<{
  id?: number
  name?: string
}>

@Entity('tb_test1')
export class tb_test1 implements tb_test1_zod_i {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  constructor(data?: TbTest1ConstructorData) {
    if (data) {
      // 只赋值实体中存在的字段
      if ('id' in data && data.id !== undefined) {
        this.id = data.id
      }
      if ('name' in data && data.name !== undefined) {
        this.name = data.name
      }
    }
  }
}
