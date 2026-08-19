import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { USER_REGISTER } from "../graphql/Mutation/USER_REGISTER";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import useApi from "../Api";
import login_img from "../assets/login_img.png";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

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
  const navigate = useNavigate();
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
        createUserMutation.mutate();
      }
    } catch (error) {
      throw error;
    }
  }

  async function createRegister() {
    return await useApi({
      query: USER_REGISTER,
      input: {
        name: register.name,
        email: register.email,
        password: register.password,
      },
    });
  }

  const createUserMutation = useMutation({
    mutationFn: createRegister,
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ bgcolor: "#e3e7f3", minHeight: "100vh", width: "100%" }}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${login_img})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
            }}
          ></Box>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{
            minHeight: "100vh",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            px: {
              xs: 2,
              sm: 4,
              md: 5,
              lg: 8,
            },

            py: {
              xs: 3,
              sm: 4,
              md: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                width: "100%",

                maxWidth: {
                  xs: "100%",
                  sm: 500,
                  md: 520,
                },

                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },

                borderRadius: {
                  xs: 2,
                  sm: 3,
                },

                boxSizing: "border-box",
              }}
            >
              <Stack
                spacing={{
                  xs: 3,
                  sm: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#517cf1",
                      fontFamily: '"Segoe UI"',
                      fontWeight: "600",
                      fontSize: {
                        xs: "1.7rem",
                        sm: "2rem",
                        md: "2.2rem",
                      },
                    }}
                  >
                    Welcome to Live VoteFlow
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 1,
                      fontFamily: '"Segoe UI"',
                      color: "#354675",
                      fontSize: 13,
                    }}
                  >
                    Sign in to share your opinion and participate in live polls.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PersonIcon />
                  <TextField
                    placeholder="Name"
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
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <MailIcon />
                  <TextField
                    placeholder="Email"
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
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LockIcon />
                  <TextField
                    placeholder="Password"
                    fullWidth
                    id={err.password ? "outlined-error" : "outlined-basic"}
                    variant="outlined"
                    type="password"
                    value={register.password}
                    error={err.password}
                    helperText={message.password}
                    onChange={(e) => {
                      setRegister({ ...register, password: e.target.value });
                      setErr({ ...err, password: false });
                      setMessage({ ...message, password: "" });
                    }}
                  />
                </Box>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleRegister}
                  sx={{
                    mt: 3,
                    bgcolor: "#6d92f7",
                    width: 200,
                    borderRadius: 3,
                    mb: 3,
                  }}
                  variant="contained"
                >
                  Register
                </Button>
                <Link to="/">
                  <Typography
                    sx={{
                      fontWeight: 1,
                      fontFamily: '"Segoe UI"',
                      color: "#354675",
                      fontSize: 13,
                    }}
                  >
                    Account already exist? Login
                  </Typography>
                </Link>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
