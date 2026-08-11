import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
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
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button onClick={handleLogin} sx={{ mt: 3 }} variant="contained">
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
