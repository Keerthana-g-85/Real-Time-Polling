import { gql } from "graphql-request";
export const USER_REGISTER = gql`
  mutation Mutation($input: CreateRegisterArguments!) {
    createUsers(input: $input) {
      success
      message
    }
  }
`;
