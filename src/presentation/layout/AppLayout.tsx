/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { loadStateFn, removeStateFn } from "../../utils/localStorage";
import {
  AppBar,
  Avatar,
  CssBaseline,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  List,
  MenuItem,
  ListSubheader,
  Toolbar,
  Divider,
  InputAdornment,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import QRTypography from "../../shared/QRTypography";
import QRBox from "../../shared/QRBox";
import { styled, useTheme } from "@mui/material/styles";
import { sidebarAtt } from "../../description/sidebar.description";
import ArrowRight from "../../assets/svg/arrowRight.svg";
import { upperCase } from "../../utils/javascript";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/png/logo.png";
import MbLogo from "../../assets/png/mb-logo.png";
import Footer from "../Footer";
import QRButton from "../../shared/QRButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import theme from "../../themes/theme";
import {
  CardContentStyle,
  CardStyle,
  CircleStyle,
  DiamondStyle,
  InnerCircleStyle,
  StyledBottomNavigation,
  StyledListItem,
} from "./style";
import { ReactComponent as MobileMenu } from "../../assets/svg/menu.svg";
import QRTextField from "../../shared/QRTextField";
import SearchIcon from "@mui/icons-material/Search";
import LanguageSelector from "../../shared/LanguageSelector";
import { LOGOUT } from "../../redux/constants";
import { isExpired } from "react-jwt";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const drawerWidth = 305;

export default function AppLayout(props: { window?: any }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state: any) => state.app?.auth);
  const token = loadStateFn();
  const userName = "XYZ";
  const theme = useTheme();
  const isScreenMedium = useMediaQuery(theme.breakpoints.up("md"));
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const hidden = useMediaQuery(theme.breakpoints.up(900));

  useEffect(() => {
    if ((!isAuthenticated && !token) || isExpired(token)) {
      navigate("/login");
    }
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [isScreenMedium, isScreenSmall]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeStateFn("token");
    removeStateFn("isAuthenticated");
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const handleMobileClose = () => {
    setMobileAnchorEl(null);
  };

  // const logoutUser = () => {
  //   localStorage.clear("token");
  //   navigate("/");
  // };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenu = (event: any) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const drawer = (
    <QRBox
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Toolbar
        sx={{ minHeight: "auto !important", justifyContent: "center" }}
        disableGutters={true}
      >
        {/* <Logo /> */}
        <img width={"75%"} src={Logo} alt="QR" />

        {/* <QRTypography
          noWrap
          fontWeight={700}
          component="div"
          fontSize={"21.36px"}
        >
          {t("QRgenerator")}
        </QRTypography> */}
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
            <List>
              {v?.map((e: any, index: number) => {
                const Icon = e.icon;
                return (
                  <React.Fragment key={index}>
                    <StyledListItem
                      key={e.label}
                      isActive={location.pathname === e.redirectPath}
                      disablePadding
                      disableGutters
                      secondaryAction={<img src={ArrowRight} />}
                    >
                      <ListItemButton
                        onClick={() => {
                          navigate(e.redirectPath);
                          setMobileOpen(false);
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color:
                              location.pathname === e.redirectPath
                                ? "#fff"
                                : "",
                          }}
                        >
                          <Icon
                            style={{
                              fill: `${
                                location.pathname === e.redirectPath
                                  ? "#fff"
                                  : "#4181E0"
                              }`,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={e?.label} />
                      </ListItemButton>
                    </StyledListItem>
                    <Divider sx={{ borderStyle: "dashed", m: 1 }} />
                  </React.Fragment>
                );
              })}
            </List>
          </QRBox>
        );
      })}

      <QRBox sx={{ pb: 1, marginTop: "auto" }}>
        <QRTypography
          color="rgba(126, 164, 167, 1)"
          variant="subtitle2"
          sx={{ ml: 3, mb: 1 }}
        >
          {upperCase(t("subscription"))}
        </QRTypography>
        <CardStyle>
          <CircleStyle></CircleStyle>
          <InnerCircleStyle></InnerCircleStyle>
          <DiamondStyle></DiamondStyle>
          <CardContentStyle>
            <QRTypography fontSize={20} position="relative" top="-13px">
              {t("freeTrial")}
            </QRTypography>
            <QRTypography fontSize={12} position="relative" top="-12px">
              {t("packDuration")}
            </QRTypography>
            <QRButton
              variant="contained"
              sx={{
                background: "#fff",
                color: theme.palette.primary.main,
                "&:hover": {
                  background: "#fff",
                },
              }}
            >
              {t("upgradePlan")}
            </QRButton>
          </CardContentStyle>
        </CardStyle>
      </QRBox>
    </QRBox>
  );

  const bottomNavigation = (
    <StyledBottomNavigation showLabels>
      {Object.entries(sidebarAtt)?.map(([k, v]: any, index: number) => {
        return v?.map((subItem: any, index: number) => {
          const Icon = subItem?.icon;
          return (
            subItem?.label !== "All QR" && (
              <BottomNavigationAction
                key={index}
                // isActive={location.pathname === subItem.redirectPath}
                onClick={() => {
                  navigate(subItem?.redirectPath);
                }}
                label={subItem?.label}
                icon={
                  <Icon
                    height={25}
                    width={25}
                    style={{
                      fill: "#4181E0",
                    }}
                  />
                }
              />
            )
          );
        });
      })}
      <BottomNavigationAction
        label="Search QR"
        // isActive={location.pathname === ""}
        icon={
          <SearchIcon
            height={25}
            width={25}
            style={{
              fill: `${location.pathname === "" ? "#fff" : "#4181E0"}`,
            }}
          />
        }
      />
      <BottomNavigationAction
        // onClick={ }
        label={userName.trim()}
        // isActive={location.pathname === ""}
        icon={
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {userName.trim().charAt(0)}
          </Avatar>
        }
      />
    </StyledBottomNavigation>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <QRBox display="flex" minHeight="100vh">
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            ml: { md: `0px`, lg: `auto` },
            background: "#fff",
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar
            sx={{
              display: {
                sm: "flex",
                md: "none",
              },
              justifyContent: { xs: "space-between" },
              border: "1px solid #EDE2E2",
              borderRadius: "14px",
              m: "3%",
              px: "9px",
              py: "5px",
            }}
          >
            <QRBox display="flex" alignItems="center">
              {/* <Logo /> */}
              <img src={MbLogo} alt="QR" />
            </QRBox>
            <QRBox
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={handleDrawerToggle}
            >
              <MobileMenu
                aria-controls={"mobile-customized-menu"}
                // onClick={handleDrawerToggle}
                style={{ cursor: "pointer" }}
              />
              <Menu
                id="mobile-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "mobile-customized-button",
                }}
                sx={{
                  display: {
                    xs: "flex",
                    md: "none",
                    maxWidth: "150px !important",
                    "& .MuiMenu-paper": {
                      width: "100%",
                    },
                  },
                  "& .MuiList-root": {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center !important",
                    justifyContent: "center !important",
                  },
                }}
                anchorEl={mobileAnchorEl}
                open={Boolean(mobileAnchorEl)}
                onClose={handleMobileClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} disableRipple>
                  Logout
                </MenuItem>
              </Menu>
              <QRTypography
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  lineHeight: "12px",
                  letterSpacing: "0.245em",
                  textTransform: "uppercase",
                  color: "#1B294B",
                  pt: 1,
                }}
              >
                menu
              </QRTypography>
            </QRBox>
          </Toolbar>
          <Toolbar
            sx={{
              display: { xs: "none", md: "flex" },
              // width: `calc(100% - ${drawerWidth}px)`,
              height: "90px",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "0 0px 20px 0",
              boxShadow: "2px 0px 4px 0px #00000040",
            }}
          >
            <QRTextField
              type="search"
              id="search"
              placeholder="Search QR"
              sx={{
                // left: drawerWidth,
                "& .MuiInputBase-root": {
                  margin: "auto",
                  border: "1px solid #E2E2E3",
                  borderRadius: "15.5px",
                },
                "& .MuiOutlinedInput-root fieldset": {
                  border: "none",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <div>
              <LanguageSelector />
              <QRButton
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                variant="outlined"
                sx={{
                  borderRadius: "24px !important",
                  width: "fit-content !important",
                  marginLeft: "10px",
                  "& .MuiButton-startIcon>*:nth-of-type(1)": {
                    fontSize: "small",
                  },
                }}
                disableElevation
                onClick={handleMenu}
                startIcon={
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    {userName.trim().charAt(0)}
                  </Avatar>
                }
                endIcon={<KeyboardArrowDownIcon />}
              >
                {userName}
              </QRButton>
            </div>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              sx={{ display: { xs: "none", md: "flex" } }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} disableRipple>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <QRBox
          // component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          // aria-label="mailbox folders"
        >
          {/*  <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { sm: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                padding: 2,
              },
            }}
          >
            {drawer}
          </Drawer> */}
          <Drawer
            variant={mobileOpen ? "temporary" : undefined}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", lg: "none" },
              flexDirection: "column",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRadius: "0 20px 20px 0",
                padding: 2,
                boxShadow:
                  "0px 0px 4px -1px rgba(0,0,0,0.2), 0px 0px 2px 0px rgba(0,0,0,0.14), 0px 0px 10px 0px rgba(0,0,0,0.12)",
              },
            }}
            open={mobileOpen}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant={mobileOpen ? undefined : "permanent"}
            sx={{
              display: { xs: "none", md: "block" },
              flexDirection: "column",
              "& .MuiDrawer-paper": {
                // width: drawerWidth,
                boxSizing: "border-box",
                borderRadius: "0 20px 0px 0",
                padding: 2,
                boxShadow:
                  "0px 0px 4px -1px rgba(0,0,0,0.2), 0px 0px 2px 0px rgba(0,0,0,0.14), 0px 0px 10px 0px rgba(0,0,0,0.12)",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </QRBox>
        <QRBox
          component="main"
          sx={{
            flexGrow: 1,
            // pt: { xs: 10, sm: 12, md: 12, lg: 12 },
            /*  p: {
               xs: "113px 4% 69px 4%",
               sm: "130px 3% 71px 3%",
               md: "99px 1% 0 1%",
               lg: "112px 14px 0 14px",
             }, */
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
            // p: 3
            pt: { xs: 3, md: 3 },
            px: { xs: 2, md: 2 },
            pb: { xs: 7, md: 3 },
          }}
        >
          <Toolbar sx={{ height: "90px" }} />
          <Outlet />
          {hidden ? null : <QRBox>{bottomNavigation}</QRBox>}
        </QRBox>
      </QRBox>
      {/* <Footer /> */}
    </>
  );
}
