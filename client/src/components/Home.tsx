import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import type { Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import useApi from "../Api";
import { LOGOUT } from "../graphql/Mutation/LOG_OUT";
import { setUser } from "../redux/LoginSlice";
import PollIcon from "@mui/icons-material/Poll";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    backgroundColor: "#242f4e",
    color: "white",
  },

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),

        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),

        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
        },
      },
    },
  ],
}));
export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon sx={{ color: "white" }} />,
      path: "/dashboard",
    },
    {
      text: "Create Poll",
      icon: <AddIcon sx={{ color: "white" }} />,
      path: "/create_poll",
    },
    {
      text: "Active Poll",
      icon: <HowToVoteIcon sx={{ color: "white" }} />,
      path: "/active_poll",
    },
    {
      text: "Completed Poll",
      icon: <PollIcon sx={{ color: "white" }} />,
      path: "/completed_poll",
    },

    {
      text: "Logout",
      icon: <LogoutIcon sx={{ color: "white" }} />,
      path: "",
    },
  ];
  async function handleLogout() {
    try {
      await useApi({ query: LOGOUT });
    } finally {
      dispatch(setUser(null));
      navigate("/", { replace: true });
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#e3e7f3",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#242f4e",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    onClick={() => {
                      if (item.text === "Logout") {
                        handleLogout();
                      } else {
                        navigate(item.path);
                      }
                    }}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      justifyContent: open ? "initial" : "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 0,
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            minHeight: "100vh",
            bgcolor: "#e3e7f3",

            p: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },

            boxSizing: "border-box",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
