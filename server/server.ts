import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./database.js";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import UsersResolver from "./Resolvers/UsersResolver.js";
import PollResolver from "./Resolvers/PollResolver.js";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import VoteResolver from "./Resolvers/VoteResolver.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({
  server: httpServer,
});
// const pollClients = new Map<string, Set<WebSocket>>();
// wss.on("connection", (socket) => {
//   console.log("client connected");

//   socket.on("message", (message) => {
//     const data = JSON.parse(message.toString());
//     if (data.type === "JOIN_POLL") {
//       if (!pollClients.has(data.pollId)) {
//         pollClients.set(data.pollId, new Set());
//       }

//       pollClients.get(data.pollId)?.add(socket);
//       console.log(data.pollId, pollClients.get(data.pollId)?.size);
//     }
//     console.log(data.type);
//     console.log(data.pollId);
//   });
// });

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
const schema = await buildSchema({ resolvers: [UsersResolver, PollResolver , VoteResolver] });
const server = new ApolloServer({ schema });
await server.start();
await connection();
app.use("/graphql", express.json(), expressMiddleware(server));
httpServer.listen(process.env.PORT, () => {
  console.log("Server Started", process.env.PORT);
});
