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
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
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
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
              }}
            >
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
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Poll Status
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",

                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: data?.activePolls,
                          label: "Active",
                          color: "#6ddc52db",
                        },
                        {
                          id: 1,
                          value: data?.completedPolls,
                          label: "Completed",
                          color: "#7384e5db",
                        },
                      ],
                    },
                  ]}
                  // width={500}
                  height={400}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                My Poll Activity
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                      color: "#7384e5db",
                      label: "Polls",
                    },
                  ]}
                  // width={500}
                  height={371}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
