/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Paper } from "@mui/material";
import React from "react";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";
import DoughnutChart from "../../shared/DoughnutChart";

export interface ChartContainerProps {
  Indicator: React.FC;
  title: string;
  value: number;
}

const data = {
  labels: ["Blue", "white"],
  datasets: [
    {
      label: "# of Votes",
      data: [90, 10],
      backgroundColor: ["#356ABA", "#ECE9FF"],
      cutout: 70,
      borderColor: ["#356ABA", "#ECE9FF"],
      borderWidth: 2,
    },
  ],
};

const ChartContainer = ({ Indicator, title, value }: ChartContainerProps) => {
  const { t } = useTranslation();
  return (
    <Paper elevation={0} sx={{ border: "1px solid #00000017" }}>
      <Grid
        container
        style={{
          maxWidth: "-webkit-fill-available",
        }}
      >
        <Grid maxWidth="100%">
          <DoughnutChart data={data} />
        </Grid>
        {/* <Grid lg={6} display="flex" flexDirection="column" margin="auto">
          <QRTypography color="#7286B8">{t(title)}</QRTypography>
          <QRTypography fontWeight={700} fontSize={30}>{value}</QRTypography>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default ChartContainer;
