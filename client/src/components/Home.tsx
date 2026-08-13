import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";

const drawerWidth = 240;

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3060");
    setSocket(socket);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "POLL_UPDATED") {
        console.log("Poll updated:", data.pollId);
      }
    };

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "JOIN_POLL",
          pollId: "123",
        }),
      );
    }; 
  }, []);
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      text: "Create Poll",
      icon: <HomeIcon />,
      path: "/create_poll",
    },
    {
      text: "Active Poll",
      icon: <HomeIcon />,
      path: "/active_poll",
    },
  ];

  return (
    <>
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "VOTE",
              pollId: "123",
            }),
          );
        }}
      >
        Test Vote
      </button>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mr: 15,
              }}
            ></Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />

          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text}>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
