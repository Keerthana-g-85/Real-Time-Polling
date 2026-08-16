import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";
import Poll from "../models/PollModel.js";

@ObjectType()
class CompletedPollResult {
  @Field(() => Poll)
  poll!: Poll;

  @Field(() => GraphQLJSON)
  results!: Record<string, number>;
}

@ObjectType()
export default class VoteResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  results?: Record<string, Record<string, number>>;

  @Field(() => [CompletedPollResult], { nullable: true })
  completedPolls?: CompletedPollResult[];
}
