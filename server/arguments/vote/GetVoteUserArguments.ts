import { Field, ID, ArgsType } from "type-graphql";

@ArgsType()
export default class GetVoteUsersPollArguments {
  @Field(() => ID)
  user_id!: string;
}