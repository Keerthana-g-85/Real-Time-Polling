import { gql } from "graphql-request";

export const GET_VOTED_POLLS = gql`
  query GetVotedPolls {
    getVoteUserPoll {
      success
      message
      results
    }
  }
`;
