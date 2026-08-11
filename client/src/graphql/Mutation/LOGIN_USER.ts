import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  mutation Mutation($input: LoginUser!) {
    loginUser(input: $input) {
      success
      message
      accesstoken
    }
  }
`;
