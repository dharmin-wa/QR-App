import { Box, BoxProps } from "@mui/material";
import React from "react";

const QRBox = ({ children, ...rest }: BoxProps) => {
  return <Box {...rest}>{children}</Box>;
};

export default QRBox;
