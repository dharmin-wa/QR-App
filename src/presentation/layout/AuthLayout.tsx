import React from "react";
import { Link, Outlet } from "react-router-dom";
import QrImage from "../../assets/svg/qr.svg";
import QRTypography from "../../shared/QRTypography";
import { AuthLayoutUpperContainer, QRBoxContainer, QRContainer } from "./style";
import { Grid } from "@mui/material";
import AniImage from "../../assets/png/aniImage.png";
import QRBox from "../../shared/QRBox";
import Coupons from "../../assets/svg/coupons.svg";

const AuthLayout: React.FC = () => {
  return (
    <QRBox
      sx={{
        background: "#EBF5FF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <QRBoxContainer>
        <img src={Coupons} alt="Coupons" />
        <QRTypography
          sx={{ paddingLeft: 1, fontSize: ["12px", "16px", "16px", "16px"] }}
        >
          Pricing plan
        </QRTypography>
        <QRTypography
          sx={{
            fontWeight: 700,
            paddingLeft: 0.5,
            fontSize: ["12px", "16px", "16px", "16px"],
          }}
        >
          15% off{" "}
          <Link to="" style={{ color: "#fff" }}>
            {" "}
            % Grab Now %
          </Link>
        </QRTypography>
      </QRBoxContainer>
      <AuthLayoutUpperContainer>
        <QRContainer>
          <img src={QrImage} alt="QR" width={66} height={65} />
          <QRTypography
            sx={{
              fontWeight: 700,
              fontSize: ["20px", "24px", "28px", "33.12px"],
              fontFamily: "Leelawadee UI",
              lineHeight: ["28px", "32px", "36px", "44.06px"],
            }}
          >
            QR Code Generator
          </QRTypography>
        </QRContainer>
        <QRTypography
          sx={{
            fontWeight: 400,
            lineHeight: "20.72px",
            fontSize: ["11px", "13px", "13px", "16px"],
          }}
        >
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
      <QRBox
        display="flex"
        flexDirection="column"
        flex={1}
        justifyContent="center"
        width="80%"
        maxWidth="1024px"
        alignSelf="center"
        my={5}
      >
        <Grid
          container
          style={{
            maxWidth: "-webkit-fill-available",
          }}
        >
          <Grid lg={6} maxWidth="100%" margin="auto">
            <Outlet />
          </Grid>
          <Grid lg={6} display="flex" margin="auto">
            <img
              src={AniImage}
              width={380}
              height={410}
              alt="AniImage"
              style={{
                margin: "auto",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </QRBox>
    </QRBox>
  );
};

export default AuthLayout;
