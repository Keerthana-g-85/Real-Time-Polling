import { GraphQLError } from 'graphql';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../Service/UsersService.js";
import CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import UsersResponse from "../Response/UsersResponse.js";
import LoginResponse from "../Response/LoginResponse.js";
import LoginUser from "../arguments/users/LoginUserArguments.js";
import type { AuthContext } from "../types.js";
import Users from '../models/UsersModel.js';
const userService = new UsersService();
@Resolver()
export default class UsersResolver {
  @Mutation(() => UsersResponse)
  createUsers(
    @Arg("input", () => CreateRegisterArguments) input: CreateRegisterArguments,
  ) {
    return userService.createUsers(input);
  }

  @Mutation(() => LoginResponse)
  loginUser(
    @Arg("input", () => LoginUser) input: LoginUser,
    @Ctx() ctx: AuthContext,
  ) {
    return userService.loginUser(input, ctx.res);
  }

  @Query(() =>Users)
  me(@Ctx() ctx: AuthContext) {
    if (!ctx.user) {
    throw new GraphQLError("No authentication");
  }
    return ctx.user ;
  }

  @Query(() => UsersResponse)
  getUsers(@Ctx() ctx: AuthContext) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return userService.getUsers();
  }
}
