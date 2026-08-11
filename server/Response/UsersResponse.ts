import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class UsersResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
