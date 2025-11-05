import { DataSource } from "typeorm";
import { tb_test1 } from "./entity/tb_test1";

export const db1_connect = new DataSource({
  type: "postgres",
  url: "postgresql://root:123456@103.119.2.223:2006/back?schema=public",
  entities: [tb_test1],
  synchronize: true,
  logging: false,
});


export const db1=db1_connect.manager

