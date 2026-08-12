import { gql } from "graphql-request";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      success
      message
      users {
        id
        name
        email
      }
    }
  }
`;
