import { Arg, Mutation, Resolver } from "type-graphql";
import VoteService from "../Service/VoteService.js";
import CreateVoteArguments from "../arguments/vote/CreateVoteArguments.js";
import VoteResponse from "../Response/VoteResponse.js";

const voteService = new VoteService()
@Resolver()
export default class VoteResolver {
    @Mutation(()=>VoteResponse)
    async createVote (@Arg("input" ,()=>CreateVoteArguments)input : CreateVoteArguments){
        return voteService.createVote(input)
    }
}