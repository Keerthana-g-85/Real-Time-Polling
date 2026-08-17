import { DataSource } from "typeorm";
import dotenv from "dotenv";
import Users from "./models/UsersModel.js";
import Poll from "./models/PollModel.js";
import Options from "./models/OptionsModel.js";
import Vote from "./models/VoteModel.js";
import AllowedUser from "./models/AllowedUsersModel.js";
import Session from "./models/SessionModel.js";

dotenv.config();

export const database = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  username: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  entities: [Users , Poll , Options , Vote , AllowedUser , Session],
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
