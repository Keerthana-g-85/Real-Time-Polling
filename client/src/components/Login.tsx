import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useApi from "../Api";
import { LOGIN_USER } from "../graphql/Mutation/LOGIN_USER";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ME } from "../graphql/Query/Me";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/LoginSlice";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [err, setErr] = useState({
    email: false,
    password: false,
  });
  const [message, setMessage] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogin() {
    try {
      if (!login.email) {
        setErr((prev) => ({ ...prev, email: true }));
        setMessage((prev) => ({ ...prev, email: "Email is required" }));
      }
      if (!login.password) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "Password is required",
        }));
      }

      if (!login.email || !login.password) {
        return;
      } else {
        userLoginMutation.mutate();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async function userLogin() {
    const response = await useApi({
      query: LOGIN_USER,
      input: {
        email: login.email,
        password: login.password,
      },
    });
    console.log(response);
    const meResponse = await useApi({ query: ME });
    console.log(meResponse)
    return meResponse.me;
  }

  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (me) => {
      dispatch(setUser(me));
      navigate("/home");
    },
  });

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          elevation={4}
          sx={{ height: "250px", width: "400px", p: 4, mt: "250px" }}
        >
          <Typography>Email :</Typography>
          <TextField
            fullWidth
            id={err.email ? "outlined-error" : "outlined-basic"}
            variant="outlined"
            type="text"
            value={login.email}
            error={err.email}
            helperText={message.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
              setErr({ ...err, email: false });
              setMessage({ ...message, email: "" });
            }}
          />
          <Typography>Password :</Typography>
          <TextField
            fullWidth
            id={err.password ? "outlined-error" : "outlined-basic"}
            variant="outlined"
            type="password"
            value={login.password}
            error={err.password}
            helperText={message.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
              setErr({ ...err, password: false });
              setMessage({ ...message, password: "" });
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleLogin} sx={{ mt: 3 }} variant="contained">
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
