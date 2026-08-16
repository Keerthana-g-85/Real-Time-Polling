import { gql } from "graphql-request";

export const GET_COMPLETED_POLL_RESULTS = gql`
  query GetCompletedPollResults($userId: ID!) {
    getCompletedPollResults(user_id: $userId) {
      success
      message
      completedPolls {
        poll {
          id
          poll_name
          question
          expire_time
          status
          option_id {
            id
            option
          }
        }
        results
      }
    }
  }
`;