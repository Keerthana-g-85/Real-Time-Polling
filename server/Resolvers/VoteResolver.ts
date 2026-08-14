import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import VoteService from "../Service/VoteService.js";
import CreateVoteArguments from "../arguments/vote/CreateVoteArguments.js";
import VoteResponse from "../Response/VoteResponse.js";
import GetVoteUsersPollArguments from "../arguments/vote/GetVoteUserArguments.js";

const voteService = new VoteService();
@Resolver()
export default class VoteResolver {
  @Mutation(() => VoteResponse)
  createVote(
    @Arg("input", () => CreateVoteArguments) input: CreateVoteArguments,
  ) {
    return voteService.createVote(input);
  }

  @Query(() => VoteResponse)
  getVoteUserPoll(
    @Args(() => GetVoteUsersPollArguments) args: GetVoteUsersPollArguments,
  ) {
    return voteService.getVoteUserPoll(args);
  }

}
