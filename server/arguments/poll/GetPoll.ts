import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export default class GetPollArguments {
  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => ID, { nullable: true })
  user_id?: string;
}
