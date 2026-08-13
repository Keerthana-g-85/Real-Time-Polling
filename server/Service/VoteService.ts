import { GraphQLError } from "graphql";
import type CreateVoteArguments from "../arguments/vote/CreateVoteArguments.js";
import { database } from "../database.js";
import Options from "../models/OptionsModel.js";
import Poll from "../models/PollModel.js";
import Users from "../models/UsersModel.js";
import Vote from "../models/VoteModel.js";

export default class VoteService {
  private usersRepo = database.getRepository(Users);
  private pollRepo = database.getRepository(Poll);
  private optionRepo = database.getRepository(Options);
  private voteRepo = database.getRepository(Vote);
  async createVote({ user_id, poll_id, option_id }: CreateVoteArguments) {
    try {
      const user = await this.usersRepo.findOneBy({ id: user_id });
      if (!user) {
        throw new GraphQLError("No user present");
      }
      const poll = await this.pollRepo.findOneBy({ id: poll_id });
      if (!poll) {
        throw new GraphQLError("No poll present");
      }
      const option = await this.optionRepo.findOneBy({ id: option_id});
      if (!option) {
        throw new GraphQLError("No option present");
      }
      const vote = this.voteRepo.create({
        user_id: user,
        poll_id: poll,
        option_id: option,
      });
      await this.voteRepo.save(vote)
      return {
        success : true ,
        message : "Vote registered"
      }
    } catch (error) {
      throw new GraphQLError("Error while creating votes");
    }
  }
}
