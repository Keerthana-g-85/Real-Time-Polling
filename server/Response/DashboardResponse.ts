import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class DashboardResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => Int)
  activePolls!: number;

  @Field(() => Int)
  completedPolls!: number;

  @Field(() => Int)
  createdByMe!: number;

  @Field(() => Int)
  allowedToMe!: number;
}
