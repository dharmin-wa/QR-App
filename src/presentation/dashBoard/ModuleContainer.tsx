import React from "react";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";

export interface ModuleContainerProps {
  Indicator: any;
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
    padding: "5px 8px",
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
        <Indicator style={{ width: "30%" }} />
        <div style={titleValueStyle}>
          <QRTypography
            color="#7286B8"
            variant="body1"
            sx={{
              fontSize: "0.9rem",
              fontWeight: 500,
              lineHeight: "22px",
              letterSpacing: "0.01em",
            }}
          >
            {t(title)}
          </QRTypography>
          <QRTypography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              lineHeight: "36px",
              letterSpacing: "0.01em",
            }}
          >
            {value}
          </QRTypography>
        </div>
      </div>
    </>
  );
};

export default ModuleContainer;
