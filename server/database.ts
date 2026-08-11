import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const database = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  username: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  entities: [],
  migrations: ["./migrations/*.ts"],
});

export const connection = async () => {
  try {
    await database.initialize();
    console.log("database connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
