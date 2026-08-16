import type CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import { database } from "../database.js";
import Users from "../models/UsersModel.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type LoginUser from "../arguments/users/LoginUserArguments.js";
import type { Response } from "express";

export default class UsersService {
  private usersRepo = database.getRepository(Users);
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
      const accesstoken = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JW_SECRET as string,
        { expiresIn: "2hr" },
      );
      res.cookie("token", accesstoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000,
      });
      return {
        success: true,
        message: "User successfully logged in",
        accesstoken,
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
}
