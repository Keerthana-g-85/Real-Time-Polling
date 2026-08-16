import { gql } from "graphql-request";

export const CREATE_VOTE = gql`
  mutation CreateVote($input: CreateVoteArguments!) {
    createVote(input: $input) {
      success
      message
    }
  }
`;