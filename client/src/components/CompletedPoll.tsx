import { useQuery } from "@tanstack/react-query";
import useApi from "../Api";
import { Box, Card, Typography } from "@mui/material";
import type { CompletedPollData } from "../Types";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts";
import { GET_COMPLETED_POLL_RESULTS } from "../graphql/Query/GET_COMPLETED_POLLS";
import PollIcon from "@mui/icons-material/Poll";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function CompletedPoll() {
  const [page, setPage] = useState(1);
  const end = 2;
  const start = (page - 1) * end;

  const id = useSelector((state: any) => state.login.user.id);

  async function getCompletedPollResults() {
    const response = await useApi({
      query: GET_COMPLETED_POLL_RESULTS,
      variables: {
        start,
        end,
      },
    });
    return response.getCompletedPollResults;
  }

  const { data } = useQuery({
    queryKey: ["completedPolls", id, page],
    queryFn: getCompletedPollResults,
  });
  const completedPolls = data?.completedPolls;

  return (
    <>
      <Grid
        container
        spacing={{
          xs: 2,
          sm: 3,
        }}
      >
        {completedPolls?.map((data: CompletedPollData) => {
          const poll = data.poll;
          const results = data.results;
          return (
            <Grid size={{ xs: 12, md: 6 }} key={poll.id}>
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
                    {poll.poll_name}
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
                    {poll.question}
                  </Typography>
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
                          data: poll.option_id.map((option) => option.option),
                        },
                      ]}
                      series={[
                        {
                          data: poll.option_id.map(
                            (option) => results[option.option] ?? 0,
                          ),
                          label: "Votes",
                          color: "#7384e5db",
                        },
                      ]}
                      layout="horizontal"
                      height={500}
                      width={600}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
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
