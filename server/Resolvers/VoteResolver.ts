import { GraphQLError } from "graphql";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import VoteService from "../Service/VoteService.js";
import CreateVoteArguments from "../arguments/vote/CreateVoteArguments.js";
import VoteResponse from "../Response/VoteResponse.js";
import type { AuthContext } from "../types.js";

const voteService = new VoteService();
@Resolver()
export default class VoteResolver {
  @Mutation(() => VoteResponse)
  createVote(
    @Arg("input", () => CreateVoteArguments) input: CreateVoteArguments,
    @Ctx() ctx: AuthContext,
  ) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return voteService.createVote(input, ctx.user.id);
  }

  @Query(() => VoteResponse)
  getVoteUserPoll(@Ctx() ctx: AuthContext) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return voteService.getVoteUserPoll(ctx.user.id);
  }

  @Query(() => VoteResponse)
  getCompletedPollResults(@Ctx() ctx: AuthContext) {
    if (!ctx.user) {
      throw new GraphQLError("No authentication");
    }
    return voteService.getCompletedPollResults(ctx.user.id);
  }
}
