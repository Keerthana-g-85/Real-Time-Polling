import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../Api";
import { GET_ACTIVE_POOLS } from "../graphql/Query/GET_ACTIVE_POLLS";
import { Box, Button, Card, Typography } from "@mui/material";
import type { Options, Poll, VoteCount } from "../Types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CREATE_VOTE } from "../graphql/Mutation/CREATE_VOTE";
import { GET_VOTED_POLLS } from "../graphql/Query/GET_VOTED_POLLS";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts";
import PollIcon from "@mui/icons-material/Poll";

export default function ActivePoll() {
  const [option, setOption] = useState("");
  const queryClient = useQueryClient();
  const id = useSelector((state: any) => state?.login?.user?.id);

  async function getActivePolls() {
    const response = await useApi({
      query: GET_ACTIVE_POOLS,
      variables: { status: "Active" },
    });
    console.log(response.getPoll.polls);
    return response.getPoll.polls;
  }
  const { data: activePoll, refetch } = useQuery({
    queryKey: ["active"],
    queryFn: getActivePolls,
  });

  useEffect(() => {
    if (!activePoll) return;
    const socket = new WebSocket("ws://localhost:3060");
    socket.onopen = () => {
      activePoll.forEach((poll: Poll) => {
        console.log("Joining poll:", poll.id);
        socket.send(
          JSON.stringify({
            type: "POLL",
            pollId: poll.id,
          }),
        );
      });
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "POLL_UPDATED") {
        refetch();
        console.log("Poll updated:", data.pollId);
        console.log("Results:", data.results);
        queryClient.invalidateQueries({
          queryKey: ["votedPolls", id],
        });
      }
    };
    return () => {
      socket.close();
    };
  }, [activePoll?.map((poll: Poll) => poll.id).join(","), refetch]);

  async function getVotedPolls() {
    const response = await useApi({
      query: GET_VOTED_POLLS,
    });
    console.log(response.getVoteUserPoll);
    return response.getVoteUserPoll.results;
  }

  const { data: votedPolls } = useQuery({
    queryKey: ["votedPolls", id],
    queryFn: getVotedPolls,
  });

  async function handleSubmit(poll_id: string) {
    if (!option) {
      console.log("no option selected");
      return;
    }
    const response = await useApi({
      query: CREATE_VOTE,
      variables: {
        input: {
          poll_id: poll_id,
          option_id: option,
        },
      },
    });
    console.log(response);
    return response;
  }

  const voteMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votedPolls", id],
      });
    },
  });

  return (
    <>
      {activePoll?.map((data: Poll) => (
        <Box key={data.id} sx={{ bgcolor: "#AACDDC" }}>
          <Card sx={{ mt: 2, p: 4, bgcolor: "#FCF8F8" }}>
            <Box
              sx={{
                bgcolor: "#56B6C6",
                color: "white",
                padding: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "ui-monospace",
                  fontWeight: 700,
                  fontSize: 30,
                }}
              >
                {data.poll_name}
              </Typography>
              <PollIcon sx={{ fontSize: 36 }} />
            </Box>
            <Box sx={{ p: 3, bgcolor: "#FBEFEF", borderRadius: 2, mt: 2 }}>
              <Typography
                sx={{
                  fontFamily: "ui-monospace",
                  fontSize: 25,
                  color: "#3E5F44",
                }}
              >
                {data.question}
              </Typography>
              {!votedPolls?.[data.id] ? (
                <>
                  <RadioGroup
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    {data?.option_id?.map((i: Options) => (
                      <FormControlLabel
                        key={i.id}
                        value={i.id}
                        control={<Radio />}
                        label={i.option}
                      />
                    ))}
                  </RadioGroup>
                  <Button
                    variant="contained"
                    onClick={() => voteMutation.mutate(data.id)}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <Grid size={8}>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: data.option_id.map(
                            (option: Options) => option.option,
                          ),
                          tickLabelStyle: {
                            fontSize: 14,
                            fill: "#1E201E",
                            fontWeight: 900,
                          },
                        },
                      ]}
                      series={[
                        {
                          data: data.option_id.map((option: Options) => {
                            return (
                              (votedPolls[data.id] as VoteCount)?.[
                                option.option
                              ] ?? 0
                            );
                          }),
                          label: "Votes",
                          color: "#1A3636",
                        },
                      ]}
                      height={500}
                      width={600}
                    />
                  </Grid>
                </>
              )}
            </Box>
          </Card>
        </Box>
      ))}
    </>
  );
}
