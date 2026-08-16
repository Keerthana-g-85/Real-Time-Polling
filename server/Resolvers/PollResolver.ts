import { GraphQLError } from "graphql";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import PollService from "../Service/PollService.js";
import CreatePollArguments from "../arguments/poll/CreatePollArguments.js";
import PollResponse from "../Response/PollResponse.js";
import GetPollArguments from "../arguments/poll/GetPoll.js";
import type { AuthContext } from "../types.js";
const pollService = new PollService();
@Resolver()
export default class PollResolver {
  @Mutation(() => PollResponse)
  createPoll(
    @Arg("input", () => CreatePollArguments) input: CreatePollArguments,
    @Ctx() ctx: AuthContext,
  ) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return pollService.createPoll(input ,  ctx.user.id);
  }

  @Query(() => PollResponse)
  getPoll(
    @Args(() => GetPollArguments) args: GetPollArguments,
    @Ctx() ctx: AuthContext,
  ) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return pollService.getPoll(args ,  ctx.user.id);
  }
}
