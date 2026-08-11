import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./database.js";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import UsersResolver from "./Resolvers/UsersResolver.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
const schema = await buildSchema({ resolvers: [UsersResolver] });
const server = new ApolloServer({ schema });
server.start();
await connection();
app.use("/graphql", express.json(), expressMiddleware(server));
app.listen(process.env.PORT, () => {
  console.log("Server Started",process.env.PORT);
});
