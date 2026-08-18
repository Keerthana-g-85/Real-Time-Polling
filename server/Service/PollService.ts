import { GraphQLError } from "graphql";
import type CreatePollArguments from "../arguments/poll/CreatePollArguments.js";
import { database } from "../database.js";
import Poll from "../models/PollModel.js";
import Users from "../models/UsersModel.js";
import Options from "../models/OptionsModel.js";
import type GetPollArguments from "../arguments/poll/GetPoll.js";
import AllowedUser from "../models/AllowedUsersModel.js";
import { In, MoreThan } from "typeorm";

export default class PollService {
  private pollRepo = database.getRepository(Poll);
  async createPoll(
    {
      poll_name,
      question,
      options,
      expire_time,
      allowed_users,
    }: CreatePollArguments,
    user_id: string,
  ) {
    try {
      return await database.transaction(async (manager) => {
        const usersRepo = manager.getRepository(Users);
        const pollRepo = manager.getRepository(Poll);
        const optionsRepo = manager.getRepository(Options);
        const allowedUserRepo = manager.getRepository(AllowedUser);

        const user = await usersRepo.findOneBy({ id: user_id });
        // console.log(user);
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
          status: "Active",
        });

        const poll = await pollRepo.save(createPoll);

        const createOptions = options.map((option) =>
          optionsRepo.create({ option, poll_id: poll }),
        );
        const option = await optionsRepo.save(createOptions);

        const allowedUsers = await usersRepo.findBy({
          id: In(allowed_users),
        });

        const createAllowedUsers = allowedUsers.map((allowedUser) =>
          allowedUserRepo.create({
            poll_id: poll,
            user_id: allowedUser,
          }),
        );

        await allowedUserRepo.save(createAllowedUsers);

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

  async getPoll({ start, end }: GetPollArguments) {
    try {
      const polls = await this.pollRepo.find({
        where: {
          status: "Active",
          expire_time: MoreThan(new Date()),
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
          status: "Active",
          expire_time: MoreThan(new Date()),
        },
      });

      const total_pages = Math.ceil(total / (end as number));

      return {
        success: true,
        message: "All polls",
        polls,
        total_pages,
      };
    } catch (error) {
      console.log(error);

      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError("Error while getting polls");
    }
  }

  async getDashboard(user_id: string) {
  try {
    const polls = await this.pollRepo.find({
      relations: {
        user_id: true,
        allowed_users: {
          user_id: true,
        },
      },
    });

    for (const poll of polls) {
      if (
        poll.expire_time <= new Date() &&
        poll.status === "Active"
      ) {
        poll.status = "Completed";
        await this.pollRepo.save(poll);
      }
    }

    const accessPolls = polls.filter(
      (poll) =>
        poll.user_id.id === user_id ||
        poll.allowed_users.some(
          (allowedUser) =>
            allowedUser.user_id.id === user_id,
        ),
    );

    const activePolls = accessPolls.filter(
      (poll) => poll.status === "Active",
    );

    const completedPolls = accessPolls.filter(
      (poll) => poll.status === "Completed",
    );

    const createdByMe = polls.filter(
      (poll) => poll.user_id.id === user_id,
    );

    const allowedToMe = polls.filter(
      (poll) =>
        poll.allowed_users.some(
          (allowedUser) =>
            allowedUser.user_id.id === user_id,
        ),
    );

    return {
      success: true,
      message: "Dashboard data",
      activePolls: activePolls.length,
      completedPolls: completedPolls.length,
      createdByMe: createdByMe.length,
      allowedToMe: allowedToMe.length,
    };
  } catch (error) {
    console.log(error);

    if (error instanceof GraphQLError) {
      throw error;
    }

    throw new GraphQLError(
      "Error while getting dashboard",
    );
  }
}
}
