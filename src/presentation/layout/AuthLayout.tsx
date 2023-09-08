import React from "react";
import { Link, Outlet } from "react-router-dom";
import QrImage from "../../assets/svg/qr.svg";
import QRTypography from "../../shared/QRTypography";
import {
  AuthLayoutUpperContainer,
  OutletContainer,
  QRContainer,
} from "./style";
import { Grid } from "@mui/material";
import AniImage from "../../assets/png/aniImage.png";
import QRStack from "../../shared/QRStack";
import QRBox from "../../shared/QRBox";

const AuthLayout: React.FC = () => {
  return (
    <QRBox sx={{ background: "#4181e021" }}>
      <AuthLayoutUpperContainer>
        <QRContainer>
          <img src={QrImage} alt="QR" />
          <QRTypography
            sx={{
              fontWeight: 700,
              fontSize: "33.12px",
              fontFamily: "Leelawadee UI",
              lineHeight: "44.06px",
            }}
          >
            QR Code Generator
          </QRTypography>
        </QRContainer>
        <QRTypography sx={{ fontWeight: 400, lineHeight: "20.72px" }}>
          Sign up now and try all features{" "}
          <Link
            to=""
            style={{
              color: "#4181E0",
            }}
          >
            free for 14 days
          </Link>
        </QRTypography>
      </AuthLayoutUpperContainer>
      <QRStack position="relative" zIndex={7}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} m="auto">
            <OutletContainer>
              <Outlet />
            </OutletContainer>
          </Grid>
          <Grid item xs={12} md={6} m="auto">
            <img src={AniImage} width={411.44} height={419} alt="AniImage" />
          </Grid>
        </Grid>
      </QRStack>
    </QRBox>
  );
};

export default AuthLayout;
