import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function Register() {
  function handleRegister() {}
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
          <TextField fullWidth />

          <Typography>Email :</Typography>
          <TextField fullWidth />

          <Typography>Password :</Typography>
          <TextField fullWidth />

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
