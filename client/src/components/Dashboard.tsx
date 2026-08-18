import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { BarChart, PieChart } from "@mui/x-charts";

import { useQuery } from "@tanstack/react-query";
import useApi from "../Api";
import { GET_DASHBOARD } from "../graphql/Query/GET_DASHBOARD";

export default function Dashboard() {
  async function getDashboard() {
    const response = await useApi({
      query: GET_DASHBOARD,
    });

    return response.getDashboard;
  }

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  const cards = [
    {
      title: "Active Polls",
      value: data?.activePolls,
    },
    {
      title: "Completed Polls",
      value: data?.completedPolls,
    },
    {
      title: "Created By Me",
      value: data?.createdByMe,
    },
    {
      title: "Allowed Polls",
      value: data?.allowedToMe,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Live Vote Polling
      </Typography>

      <Grid container spacing={2}>
        {cards?.map((card) => (
          <Grid
            size={{
              md: 3,
            }}
            key={card.title}
          >
            <Card>
              <CardContent>
                <Typography>{card.title}</Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mt: 1,
                  }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Poll Status
              </Typography>

              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: data?.activePolls,
                        label: "Active",
                      },
                      {
                        id: 1,
                        value: data?.completedPolls,
                        label: "Completed",
                      },
                    ],
                  },
                ]}
                width={500}
                height={400}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                My Poll Activity
              </Typography>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Created", "Allowed"],
                  },
                ]}
                series={[
                  {
                    data: [data?.createdByMe, data?.allowedToMe],
                    label: "Polls",
                  },
                ]}
                width={500}
                height={371}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
