/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { loadStateFn } from "../../utils/localStorage";
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
} from "@mui/material";
import QRTypography from "../../shared/QRTypography";
import QRBox from "../../shared/QRBox";
import { styled } from "@mui/material/styles";
import { sidebarAtt } from "../../description/sidebar.description";
import ArrowRight from "../../assets/svg/arrowRight.svg";
import { upperCase } from "../../utils/javascript";
import { useTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../../assets/svg/qr.svg";
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
} from "./style";
import { ReactComponent as MobileMenu } from "../../assets/svg/menu.svg";
import QRTextField from "../../shared/QRTextField";
import SearchIcon from "@mui/icons-material/Search";

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

export default function ProtectedRoute(props: { window?: any }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector((state: any) => state.app?.auth);
  const token = loadStateFn();
  const userName = "XYZ";

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate("/login");
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      <Toolbar disableGutters={true}>
        <Logo />
        <QRTypography
          noWrap
          fontWeight={700}
          component="div"
          fontSize={"21.36px"}
        >
          {t("QRgenerator")}
        </QRTypography>
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
                        // handleDrawerToggle();
                        navigate(e.redirectPath);
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            location.pathname === e.redirectPath ? "#fff" : "",
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <QRBox display="flex">
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            // width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `0px` },
            alignItems: "end",
            background: "#fff",
            boxShadow:
              "0px 0px 4px -1px rgba(0,0,0,0.2), -2px -2px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Toolbar
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <MobileMenu
              aria-controls={"mobile-customized-menu"}
              onClick={handleMobileMenu}
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
                  maxWidth: "300px !important",
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
              {Object.entries(sidebarAtt)?.map(([k, v]: any, index: number) => {
                return (
                  <List
                    key={index}
                    sx={{
                      bgcolor: "background.paper",
                      "& .MuiListSubheader-root": {
                        fontSize: "12px",
                        width: "100%",
                      },
                    }}
                    subheader={<ListSubheader>{upperCase(t(k))}</ListSubheader>}
                  >
                    {v?.map((subItem: any, index: number) => {
                      const Icon = subItem?.icon;
                      return (
                        <StyledListItem
                          key={index}
                          onClick={() => {
                            navigate(subItem?.redirectPath);
                          }}
                          isActive={location.pathname === subItem.redirectPath}
                        >
                          <ListItemIcon>
                            <Icon
                              height={25}
                              width={25}
                              style={{
                                fill: `${
                                  location.pathname === subItem.redirectPath
                                    ? "#fff"
                                    : "#4181E0"
                                }`,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={`${k}-${subItem?.label}`}
                            primary={subItem?.label}
                            primaryTypographyProps={{
                              align: "left",
                              variant: "body1",
                            }}
                          />
                        </StyledListItem>
                      );
                    })}
                  </List>
                );
              })}
            </Menu>
          </Toolbar>
          <Toolbar
            sx={{
              display: { xs: "none", md: "flex" },
              width: `calc(100% - ${drawerWidth}px)`,
              height: "90px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <QRTextField
              type="search"
              id="search"
              placeholder="Search QR"
              sx={{
                "& .MuiInputBase-root": {
                  margin: "auto",
                  border: "1px solid #00000017",
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
            <QRButton
              aria-controls={"demo-customized-menu"}
              aria-haspopup="true"
              variant="outlined"
              sx={{
                borderRadius: "24px !important",
                "&.MuiButton-root": {
                  width: "fit-content !important",
                },
                // display: { lg: "inline", md: "none" },
                "& .MuiButton-startIcon>*:nth-of-type(1)": {
                  fontSize: "13px",
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
                  {userName.charAt(0)}
                </Avatar>
              }
              endIcon={<KeyboardArrowDownIcon />}
            >
              {userName}
            </QRButton>
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
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Duplicate
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Archive
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                More
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <QRBox
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                padding: 2,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              flexDirection: "column",

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRadius: "0 20px 20px 0",
                padding: 2,
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
            p: { xs: 10, sm: 12, md: 12, lg: "112px 14px 0 24px" },

            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet />
        </QRBox>
      </QRBox>
      <Footer />
    </>
  );
}
