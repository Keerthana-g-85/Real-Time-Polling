import { Field, InputType } from "type-graphql";

@InputType()
export default class LoginUser {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}