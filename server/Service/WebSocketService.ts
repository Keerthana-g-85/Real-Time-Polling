import { WebSocket } from "ws";

const pollUsers = new Map<string, Set<WebSocket>>();
export interface Result {
option : string ,
count : number
}
export const joinPoll = (pollId: string, socket: WebSocket) => {
  if (!pollUsers.has(pollId)) {
    pollUsers.set(pollId, new Set());
  }
  pollUsers.get(pollId)?.add(socket);
};

export const notifyPollUpdated = (pollId: string, results: Result[]) => {
  pollUsers.get(pollId)?.forEach((data) => {
    data.send(
      JSON.stringify({
        type: "POLL_UPDATED",
        pollId,
        results,
      }),
    );
  });
};

export const leavePolls = (socket: WebSocket) => {
  pollUsers.forEach((users, pollId) => {
    users.delete(socket);

    if (users.size === 0) {
      pollUsers.delete(pollId);
    }
  });
};
