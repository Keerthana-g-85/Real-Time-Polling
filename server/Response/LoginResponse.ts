import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class LoginResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => String, { nullable: true })
  accesstoken?: string;
}
