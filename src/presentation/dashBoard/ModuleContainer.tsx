import { useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed

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

  const indicatorSize: any = isSmScreen ? "small" : "large"; // Define your indicator size based on the breakpoint

  return (
    <>
      <div style={columnStyle}>
        <div style={{ width: indicatorSize, height: indicatorSize }}>
          <Indicator />
        </div>
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
