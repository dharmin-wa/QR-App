import { Typography, TypographyProps } from "@mui/material";
import React from "react";

const QRTypography = ({
  children,
  className,
  color,
  ...rest
}: TypographyProps) => {
  return <Typography {...{ color, className, ...rest }}>{children}</Typography>;
};

export default QRTypography;
