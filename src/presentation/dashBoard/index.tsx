import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { sidebarAtt } from "../../description/dashboard.description";
import QRTypography from "../../shared/QRTypography";
import { upperCase } from "../../utils/javascript";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/svg/qr.svg";
import QRBox from "../../shared/QRBox";
import { styled } from "@mui/material/styles";
import ArrowRight from "../../assets/svg/arrowRight.svg";

const drawerWidth = 325;

interface StyledListItemProps {
  isActive: boolean;
}

const StyledListItem = styled(ListItem)<StyledListItemProps>(
  ({ isActive }) => ({
    backgroundColor: isActive ? "#356ABA" : "",
    color: isActive ? "#fff" : "",
    borderRadius: "29px",
    maxWidth: "243px",
    margin: 4,
    border: isActive ? "1px solid #00CEDB" : "",
    "& .MuiListItemSecondaryAction-root": {
      marginRight: "25px",
    },
  }),
);

export default function ResponsiveDrawer(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  // const location = useLocation();
  // const userName = localStorage.getItem("username")

  // const theme = useTheme();
  // console.log(location.pathname);
  const navigate = useNavigate();

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
      <Toolbar disableGutters={true}>
        <img src={Logo} height="25%" width="25%" alt="LOGO" />
        <Typography
          noWrap
          fontWeight={700}
          component="div"
          fontSize={"21.36px"}
        >
          {t("QRgenerator")}
        </Typography>
      </Toolbar>
      {Object.entries(sidebarAtt)?.map(([k, v], index: number) => {
        return (
          <QRBox key={index} sx={{ mt: 4 }}>
            <QRTypography
              color="rgba(126, 164, 167, 1)"
              variant="subtitle2"
              sx={{ ml: 3, mb: 1 }}
            >
              {upperCase(t(k))}
            </QRTypography>
            {v?.map((e: any) => (
              <StyledListItem
                key={e.label}
                isActive={location.pathname === e.redirectPath}
                disablePadding
                disableGutters
                secondaryAction={<img src={ArrowRight} />}
              >
                <ListItemButton
                  onClick={() => {
                    // handleDrawerToggle();
                    navigate(e.redirectPath);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === e.redirectPath ? "#fff" : "",
                    }}
                  >
                    <img src={e?.icon} alt="icon" />
                  </ListItemIcon>
                  <ListItemText primary={e?.label} />
                </ListItemButton>
              </StyledListItem>
            ))}
          </QRBox>
        );
      })}
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
              padding: 2,
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
