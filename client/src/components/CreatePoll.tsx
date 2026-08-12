import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useApi from "../Api";
import { CREATE_POLL } from "../graphql/Mutation/CREATE_POLL";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function CreatePoll() {
  const [poll, setPoll] = useState({
    name: "",
    question: "",
    expireTime: dayjs(),
  });
  const id = useSelector((state:any)=>state.login.user.id)
  const [options, setOptions] = useState(["", ""]);
  async function handleCreatePoll() {
    const response = await useApi({
      query: CREATE_POLL,
      input: {
        poll_name: poll.name,
        question: poll.question,
        expire_time: poll.expireTime,
        options: options,
        status: "Active",
        user_id: id,
      },
    });
    console.log(response);
    return response;
  }
  const optonsMutation = useMutation({
    mutationFn: handleCreatePoll,
    onSuccess: () => {},
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Paper elevation={4} sx={{ width: 600, height: 700, p: 4 }}>
          <Typography>Name</Typography>
          <TextField
            fullWidth
            value={poll.name}
            onChange={(e) =>
              setPoll((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <Typography>Question</Typography>
          <TextField
            fullWidth
            value={poll.question}
            onChange={(e) => {
              setPoll((prev) => ({ ...prev, question: e.target.value }));
            }}
          />

          <Typography>Options</Typography>
          {options.map((item, index) => (
            <Box sx={{ display: "flex" }} key={index}>
              {/* <TextField fullWidth value={item} onChange={(e)=>{setOPtions((prev)=>prev.with(index,e.target.value))}}/> */}

              <TextField
                fullWidth
                value={item}
                placeholder={`option${index + 1}`}
                sx={{ mt: 1 }}
                onChange={(e) => {
                  setOptions((prev) => {
                    const updated = [...prev];
                    updated[index] = e.target.value;
                    return updated;
                  });
                }}
              />
              {index >= 2 && (
                <Button
                  onClick={() =>
                    setOptions((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <CloseIcon />
                </Button>
              )}
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={() => setOptions((prev) => [...prev, ""])}
            sx={{ mt: 1, mb: 1 }}
          >
            Options +
          </Button>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="DateTimePicker">
              <DateTimePicker
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                defaultValue={dayjs()}
                value={poll.expireTime}
                onChange={(e) => {
                  setPoll((prev) => ({
                    ...prev,
                    expireTime: e ?? prev.expireTime,
                  }));
                }}
              />
            </DemoItem>
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            onClick={() => {
              optonsMutation.mutate();
            }}
          >
            Create
          </Button>
        </Paper>
      </Box>
    </>
  );
}
