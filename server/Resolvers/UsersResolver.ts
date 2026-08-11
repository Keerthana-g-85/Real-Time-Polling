import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../Service/UsersService.js";
import CreateRegisterArguments from "../arguments/users/CreateRegisterArguments.js";
import UsersResponse from "../Response/UsersResponse.js";
const userService = new UsersService();
@Resolver()
export default class UsersResolver {
  @Mutation(() => UsersResponse)
  createUsers(
    @Arg("input", () => CreateRegisterArguments) input: CreateRegisterArguments,
  ) {
    return userService.createUsers(input);
  }

  @Query(()=>UsersResponse)
  getUsers(){
    return userService.getUsers()
  }
}
