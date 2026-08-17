import { useQuery } from "@tanstack/react-query";
import useApi from "../Api";
import { Box, Card, Typography } from "@mui/material";
import type { Poll } from "../Types";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts";
import { GET_COMPLETED_POLL_RESULTS } from "../graphql/Query/GET_COMPLETED_POLLS";
import PollIcon from "@mui/icons-material/Poll";

type CompletedPollData = {
  poll: Poll;
  results: Record<string, number>;
};

export default function CompletedPoll() {
  const id = useSelector((state: any) => state.login.user.id);

  async function getCompletedPollResults() {
    const response = await useApi({
      query: GET_COMPLETED_POLL_RESULTS,
    });

    return response.getCompletedPollResults.completedPolls;
  }

  const { data: completedPolls } = useQuery<CompletedPollData[]>({
    queryKey: ["completedPolls", id],
    queryFn: getCompletedPollResults,
  });

  return (
    <>
      {completedPolls?.map((data) => {
        const poll = data.poll;
        const results = data.results;
        return (
          <Box key={poll.id} sx={{ bgcolor: "#AACDDC" }}>
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
                  {poll.poll_name}
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
                  {poll.question}
                </Typography>

                <Grid size={8}>
                  <BarChart
                    xAxis={[
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
                        color: "#1A3636",
                      },
                    ]}
                    height={500}
                    width={600}
                  />
                </Grid>
              </Box>
            </Card>
          </Box>
        );
      })}
    </>
  );
}
