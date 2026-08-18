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
import useApi from "../Api";
import { LOGIN_USER } from "../graphql/Mutation/LOGIN_USER";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { ME } from "../graphql/Query/Me";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/LoginSlice";
import login_img from "../assets/image1.jpg";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

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
    console.log(meResponse);
    return meResponse.me;
  }

  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (me) => {
      dispatch(setUser(me));
      navigate("/dashboard");
    },
  });

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          bgcolor: "#eaecf0",
          flexWrap: "wrap",
          minHeight: "100vh",
          width: "100%",
        }}
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
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: "100vh",
              bgcolor: "white",
            }}
          ></Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: {
              xs: 2,
              sm: 4,
              lg: 8,
            },

            py: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Paper
            elevation={1}
            sx={{
              boxSizing: "border-box",
              borderRadius: 3,
              width: "100%",
              maxWidth: {
                xs: "100%",
                sm: 500,
                md: 520,
              },
              p: {
                xs: 3,
                sm: 4,
                md: 4,
              },
              minHeight: 370,
              ml: { xs: 0, md: 0 },
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
                      md: "2rem",
                    },
                  }}
                >
                  Welcome Back to Live VoteFlow
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 1,
                    fontFamily: '"Segoe UI"',
                    color: "#354675",
                    fontSize: {
                      xs: 12,
                      sm: 13,
                    },
                    textAlign: "center",
                  }}
                >
                  Vote, share your opinion, and discover what others think
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <MailIcon />
                <TextField
                  fullWidth
                  placeholder="Email "
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
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <LockIcon />
                <TextField
                  fullWidth
                  placeholder="Password"
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
                onClick={handleLogin}
                sx={{
                  mt: 3,
                  bgcolor: "#6d92f7",
                  width: 200,
                  borderRadius: 3,
                  mb: 3,
                }}
                variant="contained"
              >
                Login
              </Button>
              <Link to="/register">
                <Typography
                  sx={{
                    fontWeight: 1,
                    fontFamily: '"Segoe UI"',
                    color: "#354675",
                    fontSize: 13,
                  }}
                >
                  Don't have an account yet ? Register
                </Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
