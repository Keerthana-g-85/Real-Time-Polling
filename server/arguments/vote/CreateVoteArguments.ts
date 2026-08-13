import { Field, ID, InputType } from "type-graphql";

@InputType()
export default class CreateVoteArguments {
  @Field(() => ID)
  user_id!: string;

  @Field(() => ID)
  poll_id!: string;

  @Field(() => ID)
  option_id!: string;
}
