import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, AfterLoad } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Exclude, Expose } from 'class-transformer'
@Entity('tb_user') // 指定表名为 users，如果不传参数，默认使用类名转为小写（如 User → user）
export class tb_user {
  constructor(user_data?: Partial<tb_user>) {
    Object.assign(this, user_data)
  }

  @PrimaryColumn({ type: 'varchar', comment: '主键ID' })
  id: string = uuidv4() // 默认生成

  @Column({ length: 50 })
  name: string

  @Column()
  password: string

  @CreateDateColumn() // 自动记录创建时间
  at_created: Date

  @UpdateDateColumn() // 自动记录更新时间
  at_updated: Date

  @Exclude() // 不从 plain object 自动赋值
  other_name: string = '123' // 默认值（对 new User() 有效）

  @AfterLoad()
  setDefaultValues() {
    // 从数据库加载后，确保 other_name 有默认值
    this.other_name = this.name + '_' +this.at_updated.toLocaleString()
    console.log('other_name', this.other_name)
  }
}
