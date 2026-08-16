import { useQuery } from "@tanstack/react-query";
import useApi from "../Api";
import { Box, Card, Typography } from "@mui/material";
import type { Poll } from "../Types";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts";
import { GET_COMPLETED_POLL_RESULTS } from "../graphql/Query/GET_COMPLETED_POLLS";

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
          <Box key={poll.id}>
            <Card sx={{ mt: 2, p: 4 }}>
              <Typography>
                Name: {poll.poll_name}
              </Typography>

              <Typography>
                Question: {poll.question}
              </Typography>

              <Grid size={8}>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: poll.option_id.map(
                        (option) => option.option
                      ),
                    },
                  ]}
                  series={[
                    {
                      data: poll.option_id.map(
                        (option) => results[option.option] ?? 0
                      ),
                      label: "Votes",
                    },
                  ]}
                  height={300}
                  width={700}
                />
              </Grid>
            </Card>
          </Box>
        );
      })}
    </>
  );
}