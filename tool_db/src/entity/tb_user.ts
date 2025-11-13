// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("tb_user") // 指定表名为 users，如果不传参数，默认使用类名转为小写（如 User → user）
export class tb_user {
  @PrimaryGeneratedColumn("uuid") // 使用 UUID 作为主键；也可以用 "int" 表示自增整数
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn() // 自动记录创建时间
  createdAt: Date;

  @UpdateDateColumn() // 自动记录更新时间
  updatedAt: Date;
}