import { gql } from "graphql-request";

export const GET_ACTIVE_POOLS = gql`
  query GetPoll($status: String) {
    getPoll(status: $status) {
      success
      message
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
