import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection, database } from "./database.js";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import UsersResolver from "./Resolvers/UsersResolver.js";
import PollResolver from "./Resolvers/PollResolver.js";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import VoteResolver from "./Resolvers/VoteResolver.js";
import { joinPoll, leavePolls } from "./Service/WebSocketService.js";
import type { AuthContext, AuthUser } from "./types.js";
import Users from "./models/UsersModel.js";
import Session from "./models/SessionModel.js";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({
  server: httpServer,
});
app.use(cookieParser());
wss.on("connection", (socket) => {

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === "POLL") {
      joinPoll(data.pollId, socket);
    }
  });
  socket.on("close", () => {
    leavePolls(socket);
  });
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const schema = await buildSchema({
  resolvers: [UsersResolver, PollResolver, VoteResolver],
});
const server = new ApolloServer({ schema });
await server.start();
await connection();
const limiter = rateLimit({
  windowMs : 60 *1000,
  limit : 10 ,
  message :{
    success : false ,
    message : "Too many requests , try after some time "
  }
})
app.use(limiter)
// app.use("/graphql", express.json(), expressMiddleware(server));
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }): Promise<AuthContext> => {
      let user: AuthUser | null = null;
      const sessionId = req.cookies?.sessionId;

      if (sessionId) {
        const sessionRepo = database.getRepository(Session);
        const userRepo = database.getRepository(Users);

        const session = await sessionRepo.findOne({
          where: {
            id: sessionId,
          },
        });

        if (session && session.expiresAt > new Date()) {
          const user_me = await userRepo.findOne({
            where: {
              id: session.user_id,
            },
          });
          if (user_me) {
            user = {
              id: user_me.id,
              name: user_me.name,
              email: user_me.email,
            };
          }
        }
      }

      // const accesstoken = req.cookies?.accessToken;
      // if (accesstoken) {
      //   try {
      //     user = jwt.verify(accesstoken, process.env.JW_SECRET as string) as AuthUser;
      //   } catch {
      //     user = null;
      //   }
      // }
      return { user, req, res };
    },
  }),
);
httpServer.listen(process.env.PORT, () => {
  console.log("Server Started", process.env.PORT);
});
