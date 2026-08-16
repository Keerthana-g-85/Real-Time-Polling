import { Field, Int, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";

@ObjectType()
export default class VoteResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => GraphQLJSON , {nullable: true})
  results?: Record<string, Record<string, number>>;
}
