import { gql } from "graphql-request";

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;
