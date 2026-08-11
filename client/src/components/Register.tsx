import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [message, setMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleRegister() {
    try {
      if (!register.name) {
        setErr((prev) => ({ ...prev, name: true }));
        setMessage((prev) => ({ ...prev, name: "Name is required" }));
      }

      if (!register.email) {
        setErr((prev) => ({ ...prev, email: true }));
        setMessage((prev) => ({ ...prev, email: "Email is required" }));
      } else {
        setErr((prev) => ({ ...prev, email: false }));
        setMessage((prev) => ({ ...prev, email: "" }));
      }

      if (!register.password) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "Password is required",
        }));
      } else if (register.password.length < 8) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "atleast 8 characters required",
        }));
      } else if (!/[A-Z]/.test(register.password)) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "atleast 1 uppercase required",
        }));
      } else if (!/[a-z]/.test(register.password)) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "atleast 1 lowercase required",
        }));
      } else if (!/[0-9]/.test(register.password)) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "atleast 1 number required",
        }));
      } else if (!/[!@#$%^&*]/.test(register.password)) {
        setErr((prev) => ({ ...prev, password: true }));
        setMessage((prev) => ({
          ...prev,
          password: "At least one special character required",
        }));
      } else {
        setErr((prev) => ({ ...prev, password: false }));
        setMessage((prev) => ({ ...prev, password: "" }));
      }
      if (
        !register.name ||
        !register.email ||
        !register.password ||
        !register.email.endsWith(".com") ||
        register.password.length < 8 ||
        !/[A-Z]/.test(register.password) ||
        !/[a-z]/.test(register.password) ||
        !/[0-9]/.test(register.password) ||
        !/[!@#$%^&*]/.test(register.password)
      ) {
        return;
      } else {
        
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
          sx={{ height: "300px", width: "400px", p: 4, mt: "250px" }}
        >
          <Typography>Name :</Typography>
          <TextField
            fullWidth
            id={err.name ? "outlined-error" : "outlined-basic"}
            variant="outlined"
            type="text"
            value={register.name}
            error={err.name}
            helperText={message.name}
            onChange={(e) => {
              setRegister({ ...register, name: e.target.value });
              setErr({ ...err, name: false });
              setMessage({ ...message, name: "" });
            }}
          />

          <Typography>Email :</Typography>
          <TextField
            fullWidth
            id={err.email ? "outlined-error" : "outlined-basic"}
            variant="outlined"
            type="text"
            value={register.email}
            error={err.email}
            helperText={message.email}
            onChange={(e) => {
              setRegister({ ...register, email: e.target.value });
              setErr({ ...err, email: false });
              setMessage({ ...message, email: "" });
            }}
          />

          <Typography>Password :</Typography>
          <TextField
            fullWidth
            id={err.password ? "outlined-error" : "outlined-basic"}
            variant="outlined"
            type="text"
            value={register.password}
            error={err.password}
            helperText={message.password}
            onChange={(e) => {
              setRegister({ ...register, password: e.target.value });
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
            <Button onClick={handleRegister} sx={{ mt: 3 }} variant="contained">
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
