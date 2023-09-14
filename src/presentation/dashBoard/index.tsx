import * as React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import { useTheme } from "@mui/styles";
// import { drawerItems } from "../../../utils/data";
// import Manford from "../../../assets/manfoard.png";

const drawerWidth = 240;

export default function ResponsiveDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const location = useLocation();
  // const userName = localStorage.getItem("username")

  // const theme = useTheme();
  // console.log(location.pathname);
  // const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const logoutUser = () => {
  //   localStorage.clear("token");
  //   navigate("/");
  // };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src="#" height="15%" width="15%" alt="LOGO" />
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            marginLeft: 2,
          }}
        >
          Manford
        </Typography>
      </Toolbar>
      <List>
        {/* {drawerItems.map((e) => (
          <ListItem
            className={location.pathname === e.redirectPath ? "active-tab" : ""}
            key={e.label}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                navigate(e.redirectPath);
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === e.redirectPath ? "#fff" : "",
                }}
              >
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.label} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // console.log("theme ", theme.colors.primary);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `0px` },
          paddingRight: "0px !important",
          // backgroundColor: theme.colors.primary,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="inner-menu-wrap">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { md: "none" } }}
            >
              Manford
            </Typography>
            <Typography variant="h6" noWrap component="div" />
            <Box display="flex" alignItems="center">
              {/* <Typography variant="body1" noWrap component="spam">
                {userName}
              </Typography> */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                {/* <MenuItem onClick={logoutUser}>Log out</MenuItem> */}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // backgroundColor: theme.colors.secondary,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // backgroundColor: theme.colors.secondary,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 10, md: 10, lg: 10 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}
