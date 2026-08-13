import { useQuery } from "@tanstack/react-query";
import useApi from "../Api";
import { GET_ACTIVE_POOLS } from "../graphql/Query/GET_ACTIVE_POLLS";
import { Box, Button, Card, Typography } from "@mui/material";
import type { Options, Poll } from "../Types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";

export default function ActivePoll() {
  const id = useSelector((state:any)=>state.login.user.id)
  async function getActivePolls() {
    const response = await useApi({
      query: GET_ACTIVE_POOLS,
      variables: { status: "Active" , userId : id},
    });
    console.log(response.getPoll.polls);
    return response.getPoll.polls;
  }
  const { data: activePoll } = useQuery({
    queryKey: ["active"],
    queryFn: getActivePolls,
  });
  return (
    <>
      {activePoll?.map((data: Poll) => (
        <Box key={data.id}>
          <Card sx={{ mt: 2, p: 4 }}>
            <Typography>Name : {data.poll_name}</Typography>
            <Typography>Question :{data.question}</Typography>

            <RadioGroup>
              {data?.option_id?.map((i: Options) => (
                <FormControlLabel
                  key={i.id}
                  value={i.id}
                  control={<Radio />}
                  label={i.option}
                />
              ))}
            </RadioGroup>

            <Button variant="contained">Submit</Button>
          </Card>
        </Box>
      ))}
    </>
  );
}
