import { request } from "graphql-request";

interface Value {
  query: string;
  input?: Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export default async function useApi({ query, input, variables }: Value) {
  const response = await request(
    "http://localhost:3060/graphql",
    query,
    variables ?? { input },
    {
      credentials: "include",
    },
  );
  return response;
}
