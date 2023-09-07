import React from "react";
import { Outlet } from "react-router-dom";
import QRBox from "../../shared/QRBox";
import QrImage from "../../assets/svg/qr.svg"
import QRTypography from "../../shared/QRTypography";

const AuthLayout: React.FC = () => {
  return (
    <>
      <QRBox>
        <img src={QrImage} alt="QR" />
        <QRTypography>QR Code Generator</QRTypography>
      </QRBox>
      <QRTypography>Sign up now and try all features free for 14 days</QRTypography>
      <Outlet />
    </>
  );
};

export default AuthLayout;
