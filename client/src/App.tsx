import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePoll from "./components/CreatePoll";
import ActivePoll from "./components/ActivePoll";
import ProtectedRouter from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import CompletedPoll from "./components/CompletedPoll";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create_poll" element={<CreatePoll />} />
              <Route path="/active_poll" element={<ActivePoll />} />
              <Route path="/completed_poll" element={<CompletedPoll/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
