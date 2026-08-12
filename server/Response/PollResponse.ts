import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class PollResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

}
