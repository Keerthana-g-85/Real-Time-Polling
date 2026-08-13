import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class VoteResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}
