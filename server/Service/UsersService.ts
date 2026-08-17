import type CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import { database } from "../database.js";
import Users from "../models/UsersModel.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type LoginUser from "../arguments/users/LoginUserArguments.js";
import type { Request, Response } from "express";
import type { AuthUser } from "../types.js";
import Session from "../models/SessionModel.js";
import crypto from "crypto";

export default class UsersService {
  private usersRepo = database.getRepository(Users);
  private sessionRepo = database.getRepository(Session);
  async createUsers({ name, email, password }: CreateRegisterArguments) {
    try {
      const user = await this.usersRepo.findOne({ where: { email: email } });
      if (user) {
        throw new GraphQLError("User already present");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = this.usersRepo.create({
        name,
        email,
        password: hashedPassword,
      });
      await this.usersRepo.save(newUser);
      return {
        success: true,
        message: "User successfully registered",
      };
    } catch (error) {
      console.log(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while creating Users");
    }
  }

  async loginUser({ email, password }: LoginUser, res: Response) {
    try {
      const user = await this.usersRepo.findOneBy({ email: email });
      if (!user) {
        throw new GraphQLError("Email not yet registred");
      }
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        throw new GraphQLError("Invalid Password");
      }
      // const accesstoken = jwt.sign(
      //   { id: user.id, name: user.name, email: user.email },
      //   process.env.JW_SECRET as string,
      //   { expiresIn: "2hr" },
      // );

      // const refreshtoken = jwt.sign(
      //   { id: user.id, name: user.name, email: user.email },
      //   process.env.REFRESH_SECRET as string,
      //   { expiresIn: "7d" },
      // );
      // res.cookie("accessToken", accesstoken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      //   maxAge: 2*60*60,
      // });

      // res.cookie("refreshToken", refreshtoken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      const session = this.sessionRepo.create({
        user_id: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await this.sessionRepo.save(session);

      res.cookie("sessionId",session.id , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }); 
      return {
        success: true,
        message: "User successfully logged in",
      };
    } catch (error) {
      console.log(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while logging in ");
    }
  }

  async getUsers() {
    try {
      const users = await this.usersRepo.find();
      return {
        success: true,
        message: "All users successfully fetched",
        users,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while getting Users");
    }
  }
  async refreshAccessToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        throw new GraphQLError("No refresh token");
      }
      const user = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as string,
      ) as AuthUser;
      const newAccessToken = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JW_SECRET as string,
        { expiresIn: "2hr" },
      );
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000,
      });

      return {
        success: true,
        message: "Access token refreshed",
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while getting refresh token ");
    }
  }
}
