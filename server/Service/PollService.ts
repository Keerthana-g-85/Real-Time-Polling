import { GraphQLError } from "graphql";
import type CreatePollArguments from "../arguments/poll/CreatePollArguments.js";
import { database } from "../database.js";
import Poll from "../models/PollModel.js";
import Users from "../models/UsersModel.js";
import Options from "../models/OptionsModel.js";

export default class PollService {
  private pollRepo = database.getRepository(Poll);
  async createPoll({
    poll_name,
    question,
    options,
    expire_time,
    status,
    user_id,
  }: CreatePollArguments) {
    try {
      return await database.transaction(async (manager) => {
        const usersRepo = manager.getRepository(Users);
        const pollRepo = manager.getRepository(Poll);
        const optionsRepo = manager.getRepository(Options);

        const user = await usersRepo.findOneBy({ id: user_id });
        console.log(user);
        if (!user) {
          throw new GraphQLError("No user exist");
        }

        if (expire_time <= new Date()) {
          throw new GraphQLError("Time expired");
        }

        const createPoll = pollRepo.create({
          poll_name,
          question,
          user_id: user,
          expire_time,
          status,
        });

        const poll = await pollRepo.save(createPoll);

        const createOptions = options.map((option) =>
          optionsRepo.create({ option, poll_id: poll }),
        );
        const option = await optionsRepo.save(createOptions);

        return {
          success: true,
          message: "Poll successfully created",
        };
      });
    } catch (error) {
      console.log(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error while creating Users");
    }
  }
}
