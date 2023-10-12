import React from "react";
import QRBox from "../shared/QRBox";
import { CssBaseline } from "@mui/material";
import QRTypography from "../shared/QRTypography";
import { useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { upperCase } from "../utils/javascript";

const Footer = () => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  return (
    <QRBox
      component="footer"
      sx={{
        background: theme.palette.primary.main,
        height: "32px",
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <CssBaseline />
      <QRTypography
        variant="body1"
        fontSize="14px"
        color="#fff"
        letterSpacing={0.5}
      >
        {upperCase(t("footerContent"))}
        <span style={{ fontWeight: 700 }}> {upperCase(t("QRgenerator"))}</span>
      </QRTypography>
    </QRBox>
  );
};

export default Footer;
