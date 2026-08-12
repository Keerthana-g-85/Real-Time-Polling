import { Arg, Mutation, Resolver } from "type-graphql";
import PollService from "../Service/PollService.js";
import CreatePollArguments from "../arguments/poll/CreatePollArguments.js";
import PollResponse from "../Response/PollResponse.js";
const pollService = new PollService();
@Resolver()
export default class PollResolver {
  @Mutation(() => PollResponse)
  createPoll(
    @Arg("input", () => CreatePollArguments) input: CreatePollArguments,
  ) {
    return pollService.createPoll(input);
  }
}
