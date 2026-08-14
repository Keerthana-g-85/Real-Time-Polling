import { gql } from "graphql-request";

export const GET_VOTED_POLLS = gql`
  query Query($userId: ID!) {
    getVoteUserPoll(user_id: $userId) {
      success
      message
      results
    }
  }
`;
