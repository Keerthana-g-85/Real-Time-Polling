import type CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import { database } from "../database.js";
import Users from "../models/UsersModel.js";
import { GraphQLError } from "graphql";

export default class UsersService {
  private usersRepo = database.getRepository(Users);
  async createUsers({ name, email, password }: CreateRegisterArguments) {
    try {
      const user = await this.usersRepo.find({ where: { email: email } });
      if (user) {
        throw new GraphQLError("User already present");
      }
      const newUser = this.usersRepo.create({ name, email, password });
      await this.usersRepo.save(newUser);
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Error while creating Users");
    }
  }
}
