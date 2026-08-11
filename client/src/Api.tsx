import { request } from "graphql-request";

interface Value {
  query: string;
  input?: Record<string, unknown>;
}

export default async function useApi({ query, input }: Value) {
  const response = await request("http://localhost:3060/graphql", query, {
    input: input,
  });
  return response;
}
