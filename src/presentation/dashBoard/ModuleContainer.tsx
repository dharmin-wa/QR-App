/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Paper } from "@mui/material";
import React from "react";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";

export interface ModuleContainerProps {
  Indicator: React.FC;
  title: string;
  value: number;
}

const ModuleContainer = ({ Indicator, title, value }: ModuleContainerProps) => {
  const { t } = useTranslation();
  return (
    <Paper elevation={0} sx={{ border: "1px solid #00000017" }}>
      <Grid
        container
        style={{
          maxWidth: "-webkit-fill-available",
        }}
      >
        <Grid lg={6} item maxWidth="100%" margin="auto">
          <Indicator />
        </Grid>
        <Grid lg={6} item display="flex" flexDirection="column" margin="auto">
          <QRTypography color="#7286B8">{t(title)}</QRTypography>
          <QRTypography fontWeight={700} fontSize={30}>
            {value}
          </QRTypography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ModuleContainer;
