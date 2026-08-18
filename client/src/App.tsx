import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import CreatePoll from "./components/CreatePoll";
import ActivePoll from "./components/ActivePoll";
import ProtectedRouter from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import CompletedPoll from "./components/CompletedPoll";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useApi from "./Api";
import { ME } from "./graphql/Query/Me";
import { setUser } from "./redux/LoginSlice";
import Dashboard from "./components/Dashboard";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await useApi({
          query: ME,
        });
        dispatch(setUser(response.me));
      } catch (error) {
        console.log("User not authenticated");
        dispatch(setUser(null));
      }
    }

    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
             <Route path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create_poll" element={<CreatePoll />} />
              <Route path="/active_poll" element={<ActivePoll />} />
              <Route path="/completed_poll" element={<CompletedPoll />} />
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
