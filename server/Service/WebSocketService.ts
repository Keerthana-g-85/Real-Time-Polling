import { WebSocket } from "ws";

const pollUsers = new Map<string, Set<WebSocket>>();

export const joinPoll = (pollId: string, socket: WebSocket) => {
  if (!pollUsers.has(pollId)) {
    pollUsers.set(pollId, new Set());
  }

  pollUsers.get(pollId)?.add(socket);

  console.log("Joined polls" ,"poll:", pollId, "users socket :", pollUsers.get(pollId)?.size);
};

export const notifyPollUpdated = (pollId: string) => {
  console.log("which poll changed:", pollId);
  console.log("voted ppl:", pollUsers.get(pollId)?.size);
  pollUsers.get(pollId)?.forEach((data) => {
    data.send(
      JSON.stringify({
        type: "POLL_UPDATED",
        pollId,
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
