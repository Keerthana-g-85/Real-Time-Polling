import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "http://localhost:3060/graphql",
  {
    credentials: "include",
  },
);

interface Value {
  query: string;
  input?: Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export default async function useApi({
  query,
  input,
  variables,
}: Value) {
  return client.request(
    query,
    variables ?? { input },
  );
}