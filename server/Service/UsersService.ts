import type CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import { database } from "../database.js";
import Users from "../models/UsersModel.js";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";

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
