import { GraphQLError } from "graphql";
import type CreateVoteArguments from "../arguments/vote/CreateVoteArguments.js";
import { database } from "../database.js";
import Options from "../models/OptionsModel.js";
import Poll from "../models/PollModel.js";
import Users from "../models/UsersModel.js";
import Vote from "../models/VoteModel.js";
import { notifyPollUpdated } from "./WebSocketService.js";
import type { Result } from "./WebSocketService.js";
import type GetCompletedPollResults from "../arguments/vote/GetCompletedPollResults.js";

export default class VoteService {
  private usersRepo = database.getRepository(Users);
  private pollRepo = database.getRepository(Poll);
  private optionRepo = database.getRepository(Options);
  private voteRepo = database.getRepository(Vote);
  async createVote(
    { poll_id, option_id }: CreateVoteArguments,
    user_id: string,
  ) {
    try {
      const user = await this.usersRepo.findOneBy({ id: user_id });
      if (!user) {
        throw new GraphQLError("No user present");
      }
      const poll = await this.pollRepo.findOneBy({ id: poll_id });
      if (!poll) {
        throw new GraphQLError("No poll present");
      }
      const option = await this.optionRepo.findOneBy({ id: option_id });
      if (!option) {
        throw new GraphQLError("No option present");
      }
      const voteExist = await this.voteRepo.findOne({
        where: {
          user_id: { id: user_id },
          poll_id: { id: poll_id },
        },
      });

      if (voteExist) {
        throw new GraphQLError("Vote already present");
      }
      const vote = this.voteRepo.create({
        user_id: user,
        poll_id: poll,
        option_id: option,
      });
      await this.voteRepo.save(vote);

      const votes = await this.voteRepo.find({
        where: {
          poll_id: { id: poll_id },
        },
        relations: {
          option_id: true,
        },
      });

      //   const results= {};

      //   votes.forEach((vote) => {
      //     const option = vote.option_id.option;

      //     if (results[option]) {
      //       results[option]++;
      //     } else {
      //       results[option] = 1;
      //     }
      //   });

      const results = votes.reduce<Result[]>((result, vote) => {
        const option = vote.option_id.option;
        const exist = result.find((item) => item.option === option);
        if (exist) {
          exist.count++;
        } else {
          result.push({
            option,
            count: 1,
          });
        }
        return result;
      }, []);
      notifyPollUpdated(poll_id, results);
      return {
        success: true,
        message: "Vote registered",
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while creating votes");
    }
  }

  async getVoteUserPoll(user_id: string) {
    try {
      const userPoll = await this.voteRepo.find({
        where: {
          user_id: { id: user_id },
        },
        relations: {
          poll_id: true,
        },
      });

      const pollId = userPoll.map((vote) => vote.poll_id.id);

      if (pollId.length === 0) {
        return {
          success: true,
          message: "User has not voted in any poll",
          results: {},
        };
      }

      const votes = await this.voteRepo.find({
        where: pollId.map((pollId) => ({
          poll_id: { id: pollId },
        })),
        relations: {
          poll_id: true,
          option_id: true,
        },
      });

      const results = votes.reduce<Record<string, Record<string, number>>>(
        (result, vote) => {
          const option = vote.option_id.option;
          const pollId = vote.poll_id.id;
          if (!result[pollId]) {
            result[pollId] = {};
          }
          if (!result[pollId][option]) {
            result[pollId][option] = 0;
          }
          result[pollId][option]++;

          return result;
        },
        {},
      );

      return {
        success: true,
        message: "All polls voted",
        results,
      };
    } catch (error) {
      throw new GraphQLError("Error while getting voted polls");
    }
  }

  async getCompletedPollResults(
    { start, end }: GetCompletedPollResults,
    user_id: string,
  ) {
    try {
      const polls = await this.pollRepo.find({
        where: {
          status: "Completed",
          allowed_users: {
            user_id: {
              id: user_id,
            },
          },
        },
        relations: {
          user_id: true,
          option_id: {
            votes: true,
          },
          allowed_users: {
            user_id: true,
          },
        },
        skip: start as number,
        take: end as number,
      });

      const total = await this.pollRepo.count({
        where: {
          status: "Completed",
          allowed_users: {
            user_id: {
              id: user_id,
            },
          },
        },
      });

      const total_pages = Math.ceil((total as number) / (end as number));
      const completedPolls = polls.map((poll) => {
        const results: Record<string, number> = {};

        poll.option_id.forEach((option) => {
          results[option.option] = option.votes.length;
        });
        return {
          poll,
          results,
        };
      });

      return {
        success: true,
        message: "Completed poll results",
        completedPolls,
        total_pages,
      };
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError("Error while getting completed poll results");
    }
  }
}
