import { Typography, TypographyProps } from "@mui/material";
import React from "react";

const QRTypography = ({ children, color, ...rest }: TypographyProps) => {
  return <Typography {...{ color, ...rest }}>{children}</Typography>;
};

export default QRTypography;
