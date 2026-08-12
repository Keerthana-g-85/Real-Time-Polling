import { Field, ObjectType } from "type-graphql";
import Poll from "../models/PollModel.js";

@ObjectType()
export default class PollResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => [Poll], { nullable: true })
  polls!: Poll[];
}
