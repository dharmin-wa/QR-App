import React from "react";
import { Outlet } from "react-router-dom";
import QRBox from "../../shared/QRBox";
import Coupons from "../../assets/svg/coupons.svg"
import "./style.css"

const MainLayout: React.FC = () => {
  return <>
    <QRBox className="main-container">
      <img src={Coupons} alt="Coupons" />
      Pricing plan 15% off % Grab Now %
    </QRBox>
    <Outlet />
  </>
}

export default MainLayout;
