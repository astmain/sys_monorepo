import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
@Entity('tb_user') // 指定表名为 users，如果不传参数，默认使用类名转为小写（如 User → user）
export class tb_user {
  //   @PrimaryGeneratedColumn('uuid') // 使用 UUID 作为主键；也可以用 "int" 表示自增整数    ,如果传入id，则不会自动生成
  //   id: string

//   @PrimaryColumn('uuid')
  @PrimaryColumn({ type: 'varchar', comment: '主键ID' })
  id: string = uuidv4() // 默认生成

  @Column({ length: 50 })
  name: string

  @Column()
  password: string

  @CreateDateColumn() // 自动记录创建时间
  createdAt: Date

  @UpdateDateColumn() // 自动记录更新时间
  updatedAt: Date

  constructor(user_data?: Partial<tb_user>) {
    Object.assign(this, user_data)
  }
}
