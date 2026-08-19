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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ActivePoll() {
  const [option, setOption] = useState("");
  const [page, setPage] = useState(1);
  const end = 2;
  const start = (page - 1) * end;
  const queryClient = useQueryClient();
  const id = useSelector((state: any) => state?.login?.user?.id);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff5858"];
  async function getActivePolls() {
    const response = await useApi({
      query: GET_ACTIVE_POOLS,
      variables: { status: "Active", start, end },
    });
    return response.getPoll;
  }
  const { data, refetch } = useQuery({
    queryKey: ["active", page],
    queryFn: getActivePolls,
  });

  const activePoll = data?.polls;

  useEffect(() => {
    if (!activePoll) return;
    const socket = new WebSocket("ws://localhost:3060");
    socket.onopen = () => {
      activePoll.forEach((poll: Poll) => {
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
    return response.getVoteUserPoll.results;
  }

  const { data: votedPolls } = useQuery({
    queryKey: ["votedPolls", id],
    queryFn: getVotedPolls,
  });

  async function handleSubmit(poll_id: string) {
    if (!option) {
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
      <Grid container spacing={2}>
        {activePoll?.map((data: Poll) => (
          <Grid size={{ xs: 12, md: 6 }} key={data.id}>
            <Card
              sx={{
                mt: 2,
                p: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
                bgcolor: "#FCF8F8",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#5669c6",
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
                    fontSize: {
                      xs: 18,
                      sm: 22,
                      md: 26,
                    },
                  }}
                >
                  {data.poll_name}
                </Typography>
                <PollIcon sx={{ fontSize: 36 }} />
              </Box>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  mt: 2,
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "ui-monospace",
                    fontSize: 25,
                    color: "#171931",
                  }}
                >
                  {data.question}
                </Typography>
                {!votedPolls?.[data.id] ? (
                  <>
                    <RadioGroup
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                      sx={{ p: 4 }}
                    >
                      {data?.option_id?.map((i: Options) => (
                        <FormControlLabel
                          sx={{ mb: 2 }}
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
                      sx={{
                        bgcolor: "#6d92f7",
                        width: {
                          xs: "100%",
                          sm: 140,
                        },
                        borderRadius: 3,
                        mb: 3,
                      }}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        overflowX: "auto",
                      }}
                    >
                      <BarChart
                        yAxis={[
                          {
                            scaleType: "band",
                            data: data.option_id.map(
                              (option: Options) => option.option,
                            ),
                            colorMap: {
                              type: "ordinal",
                              colors: colors,
                            },
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
                          },
                        ]}
                        layout="horizontal"
                        height={500}
                        width={600}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <Pagination
          page={page}
          count={data?.total_pages ?? 1}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
}
