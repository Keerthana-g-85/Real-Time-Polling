import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function CreatePoll() {
  const [poll, setPoll] = useState({
    name: "",
    question: "",
    expireTime: dayjs(),
  });
  const [options, setOptions] = useState(["", ""]);
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
          <TextField fullWidth value={poll.name} />

          <Typography>Question</Typography>
          <TextField fullWidth value={poll.question} />

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
          <Button variant="contained" onClick={() => setOptions((prev) => [...prev, ""])} sx={{mt:1 , mb:1}}>
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
          <Button variant="contained" sx={{mt:1 , mb:1}}>Create</Button>
        </Paper>
      </Box>
    </>
  );
}
