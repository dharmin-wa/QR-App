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

  const columnStyle: any = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
  };

  const titleValueStyle: any = {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    textAlign: "end",
  };

  return (
    <>
      <div style={columnStyle}>
        <Indicator />
        <div style={titleValueStyle}>
          <QRTypography color="#7286B8" fontSize="small">
            {t(title)}
          </QRTypography>
          <QRTypography variant="body1">{value}</QRTypography>
        </div>
      </div>
    </>
  );
};

export default ModuleContainer;
