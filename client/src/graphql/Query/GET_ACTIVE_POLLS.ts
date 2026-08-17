import { gql } from "graphql-request";

export const GET_ACTIVE_POOLS = gql`
  query GetPoll($status: String, $start: Int, $end: Int) {
    getPoll(status: $status, start: $start, end: $end) {
      success
      message
      total_pages
      polls {
        id
        poll_name
        question
        expire_time
        status
        user_id {
          id
          name
          email
        }
        option_id {
          option
          id
        }
        allowed_users {
          id
        }
      }
    }
  }
`;
