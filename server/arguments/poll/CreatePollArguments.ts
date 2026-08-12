import { Field, GraphQLISODateTime, ID, InputType } from "type-graphql";

@InputType()
export default class CreatePollArguments {
  @Field(() => String)
  poll_name!: string;

  @Field(() => String)
  question!: string;

  @Field(() => [String])
  options!: string[];

  @Field(() => GraphQLISODateTime)
  expire_time!: Date;

  @Field(() => String)
  status!: string;

  @Field(()=>ID)
  user_id! : string
}
