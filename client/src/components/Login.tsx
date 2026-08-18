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
import login_img from "../assets/login_img.png";
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
      <Grid container spacing={2} sx={{bgcolor:"#e3e7f3"}}>
        <Grid
          size={{
            xs: 12,
            md: 6,
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
        <Grid>
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
                p: 6,
                borderRadius: 3,
                width: 500,
                height: 370,
                ml: 20,
              }}
            >
              <Stack spacing={4}>
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
                    }}
                  >
                    Welcome Back to Live VoteFlow
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 1,
                      fontFamily: '"Segoe UI"',
                      color: "#354675",
                      fontSize: 13,
                    }}
                  >
                    Vote, share your opinion, and discover what others think
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 0 }}
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
                  sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 0 }}
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
