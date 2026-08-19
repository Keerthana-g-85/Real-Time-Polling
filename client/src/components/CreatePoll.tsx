import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useApi from "../Api";
import { CREATE_POLL } from "../graphql/Mutation/CREATE_POLL";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_USERS } from "../graphql/Query/GET_USERS";
import type { Users } from "../Types";

export default function CreatePoll() {
  const [poll, setPoll] = useState({
    name: "",
    question: "",
    expireTime: dayjs(),
  });
  const [options, setOptions] = useState(["", ""]);
  const [allowedusers, setAllowedUsers] = useState<string[]>([]);
  const [err, setErr] = useState({
    name: false,
    question: false,
    options: false,
    expireTime: false,
    allowedUsers: false,
  });

  const [message, setMessage] = useState({
    name: "",
    question: "",
    options: "",
    expireTime: "",
    allowedUsers: "",
  });

  async function handleCreatePoll() {
    const response = await useApi({
      query: CREATE_POLL,
      input: {
        poll_name: poll.name,
        question: poll.question,
        expire_time: poll.expireTime,
        options: options,
        allowed_users: allowedusers,
      },
    });
    return response;
  }
  const optonsMutation = useMutation({
    mutationFn: handleCreatePoll,
    onSuccess: () => {},
  });

  async function handleGetUsers() {
    const response = await useApi({ query: GET_USERS, input: {} });
    return response.getUsers.users;
  }

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: handleGetUsers,
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
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: 600,
            },
          }}
        >
          <Typography>Name</Typography>
          <TextField
            fullWidth
            value={poll.name}
            error={err.name}
            helperText={message.name}
            onChange={(e) => {
              setPoll((prev) => ({ ...prev, name: e.target.value }));
              setErr((prev) => ({ ...prev, name: false }));
              setMessage((prev) => ({ ...prev, name: "" }));
            }}
          />

          <Typography>Question</Typography>
          <TextField
            fullWidth
            value={poll.question}
            error={err.question}
            helperText={message.question}
            onChange={(e) => {
              setPoll((prev) => ({ ...prev, question: e.target.value }));
              setErr((prev) => ({ ...prev, question: false }));
              setMessage((prev) => ({ ...prev, question: "" }));
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
          {err.options && (
            <Typography color="error" variant="caption">
              {message.options}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={() => setOptions((prev) => [...prev, ""])}
            sx={{ mt: 1, mb: 1 }}
          >
            Options +
          </Button>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="DateTimePicker" sx={{ mb: 2 }}>
              <DateTimePicker
                disablePast
                views={["year", "month", "day", "hours", "minutes"]}
                value={poll.expireTime}
                onChange={(e) => {
                  setPoll((prev) => ({
                    ...prev,
                    expireTime: e ?? prev.expireTime,
                  }));

                  setErr((prev) => ({ ...prev, expireTime: false }));
                  setMessage((prev) => ({ ...prev, expireTime: "" }));
                }}
              />

              {err.expireTime && (
                <Typography color="error" variant="caption">
                  {message.expireTime}
                </Typography>
              )}
            </DemoItem>
          </LocalizationProvider>

          <Autocomplete
            multiple
            options={users ?? []}
            value={(users ?? []).filter((user: Users) =>
              allowedusers.includes(user.id),
            )}
            onChange={(_, newValue) => {
              setAllowedUsers(newValue.map((user) => user.id));
              setErr((prev) => ({ ...prev, allowedUsers: false }));
              setMessage((prev) => ({ ...prev, allowedUsers: "" }));
            }}
            disableCloseOnSelect
            getOptionLabel={(option: Users) => option.name}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;

              const SelectionIcon = selected
                ? CheckBoxIcon
                : CheckBoxOutlineBlankIcon;

              return (
                <li key={key} {...optionProps}>
                  <SelectionIcon
                    fontSize="small"
                    style={{
                      marginRight: 8,
                      padding: 9,
                      boxSizing: "content-box",
                    }}
                  />
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} label="Users" />}
          />
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
