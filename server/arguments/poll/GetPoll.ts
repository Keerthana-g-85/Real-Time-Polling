import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
export default class GetPollArguments {
  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Int, { nullable: true })
  start?: number;

  @Field(() => Int, { nullable: true })
  end?: number;
}
