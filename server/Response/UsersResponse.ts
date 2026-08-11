import { Field, ObjectType } from "type-graphql";
import Users from "../models/UsersModel.js";

@ObjectType()
export default class UsersResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Users] ,{nullable:true})
  users?: Users[];
}
