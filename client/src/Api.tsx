import { ClientError, GraphQLClient } from "graphql-request";
import { REFRESH_ACCESS_TOKEN } from "./graphql/Mutation/REFRESH_ACCESS_TOKEN";

const client = new GraphQLClient("http://localhost:3060/graphql", {
  credentials: "include",
});

interface Value {
  query: string;
  input?: Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export default async function useApi({ query, input, variables }: Value) {
  try {
    return await client.request(query, variables ?? { input });
  } catch (error) {
    if (
      error instanceof ClientError &&
      error.response.errors?.some(
        (error) => error.message === "No authentication",
      )
    ) {
      await client.request(REFRESH_ACCESS_TOKEN);

      return await client.request(query, variables ?? { input });
    }
    throw error;
  }
}
