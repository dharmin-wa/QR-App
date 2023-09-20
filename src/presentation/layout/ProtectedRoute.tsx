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
  MenuItem,
  Toolbar,
  Divider,
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

  // const logoutUser = () => {
  //   localStorage.clear("token");
  //   navigate("/");
  // };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <QRBox
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
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
            {v?.map((e: any) => {
              const Icon = e.icon;
              return (
                <>
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
                        <Icon style={{ fill: "red" }} />
                      </ListItemIcon>
                      <ListItemText primary={e?.label} />
                    </ListItemButton>
                  </StyledListItem>
                  <Divider sx={{ borderStyle: "dashed", m: 1 }} />
                </>
              );
            })}
          </QRBox>
        );
      })}
      <QRBox sx={{ pb: 1, bottom: 0 }}>
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
            <h2>{t("freeTrial")}</h2>
            <p>{t("packDuration")}</p>
            <QRButton
              variant="contained"
              sx={{ background: "#fff", color: theme.palette.primary.main }}
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
      <QRBox>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            // width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `0px` },
            alignItems: "end",
            background: "#fff",
          }}
        >
          <Toolbar>
            <QRButton
              aria-controls={"demo-customized-menu"}
              aria-haspopup="true"
              variant="outlined"
              sx={{
                borderRadius: "24px !important",
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
            pt: { xs: 8, sm: 10, md: 10, lg: 10 },
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
