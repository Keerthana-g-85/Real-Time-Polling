import { gql } from "graphql-request";

export const CREATE_VOTE = gql`
  mutation Mutation($input: CreateVoteArguments!) {
    createVote(input: $input) {
      success
      message
    }
  }
`;
