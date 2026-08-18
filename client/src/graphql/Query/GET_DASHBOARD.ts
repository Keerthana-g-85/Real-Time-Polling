import { gql } from "graphql-request";
export const GET_DASHBOARD = gql`
  query {
    getDashboard {
      success
      message
      activePolls
      completedPolls
      createdByMe
      allowedToMe
    }
  }
`;