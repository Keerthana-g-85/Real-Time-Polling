import { gql } from "graphql-request";

export const GET_COMPLETED_POLL_RESULTS = gql`
  query GetCompletedPollResults($start: Int, $end: Int) {
    getCompletedPollResults(start: $start, end: $end) {
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
          total_pages
    }
  }
`;
