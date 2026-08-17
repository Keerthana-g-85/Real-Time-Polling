import { ArgsType, Field, Int } from "type-graphql";
@ArgsType()
export default class GetCompletedPollResults {
  @Field(() => Int, { nullable: true })
  start?: number;

  @Field(() => Int, { nullable: true })
  end?: number;
}
