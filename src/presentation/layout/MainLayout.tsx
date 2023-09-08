import React from "react";
import { Link, Outlet } from "react-router-dom";
import Coupons from "../../assets/svg/coupons.svg";
import { QRBoxContainer } from "./style";
import QRTypography from "../../shared/QRTypography";

const MainLayout: React.FC = () => {
  return (
    <>
      <QRBoxContainer>
        <img src={Coupons} alt="Coupons" />
        Pricing plan{" "}
        <QRTypography sx={{ fontWeight: 700, paddingLeft: 1 }}>
          15% off <Link to=""> % Grab Now %</Link>
        </QRTypography>
      </QRBoxContainer>
      <Outlet />
    </>
  );
};

export default MainLayout;
