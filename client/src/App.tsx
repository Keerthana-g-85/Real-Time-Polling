import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePoll from "./components/CreatePoll";
import ActivePoll from "./components/ActivePoll";

export default function App() {
  return (
    <>
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
