/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Paper } from "@mui/material";
import React from "react";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";
import DoughnutChart from "../../shared/DoughnutChart";
import { ReactComponent as KpiQR } from "../../assets/svg/kpiQR.svg";

export interface ChartContainerProps {
  Indicator: React.FC;
  title: string;
  value: number;
}

const data = {
  labels: ["Active QR 70%", "Disable QR 70%"],
  datasets: [
    {
      hoverOffset: 1,
      label: "# of Votes",
      data: [90, 10],
      backgroundColor: ["#356ABA", "#ECE9FF"],
      cutout: 40,
      borderColor: ["#356ABA", "#ECE9FF"],
      // borderWidth: 2,
    },
  ],
};

const columnStyle: any = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
};

const ChartContainer = () => {
  return (
    <div style={columnStyle}>
      <DoughnutChart data={data} />
    </div>
  );
};

export default ChartContainer;
