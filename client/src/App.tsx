import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePoll from "./components/CreatePoll";
import ActivePoll from "./components/ActivePoll";
import { useEffect, useState } from "react";

export default function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3060");
    setSocket(socket);
    socket.onmessage = (event) => {
      console.log(event.data);
    };

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "JOIN_POLL",
          pollId: "123",
        }),
      );
    };
  }, []);
  return (
    <>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "VOTE",
              pollId: "123",
            }),
          );
        }}
      >
        Test Vote
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create_poll" element={<CreatePoll />} />
            <Route path="/active_poll" element={<ActivePoll />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
