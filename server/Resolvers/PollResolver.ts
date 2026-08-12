import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import PollService from "../Service/PollService.js";
import CreatePollArguments from "../arguments/poll/CreatePollArguments.js";
import PollResponse from "../Response/PollResponse.js";
import GetPollArguments from "../arguments/poll/GetPoll.js";
const pollService = new PollService();
@Resolver()
export default class PollResolver {
  @Mutation(() => PollResponse)
  createPoll(
    @Arg("input", () => CreatePollArguments) input: CreatePollArguments,
  ) {
    return pollService.createPoll(input);
  }

  @Query(()=>PollResponse)
  getPoll(@Args(()=>GetPollArguments) args:GetPollArguments){
    return pollService.getPoll(args)
  }
}
