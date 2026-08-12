import { gql } from "graphql-request";

export const CREATE_POLL = gql`
  mutation Mutation($input: CreatePollArguments!) {
    createPoll(input: $input) {
      success
      message
    }
  }
`;
