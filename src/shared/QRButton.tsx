import React from "react";
import { Button, ButtonOwnProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

interface QRButtonProps extends ButtonOwnProps {
  children?: string | number;
  isDisable?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const StyledButton = styled(Button)(() => ({
  "&.MuiButton-root": {
    width: "68%",
    borderRadius: 13,
    textTransform: "capitalize",
  },
}));

const QRButton = ({
  children,
  isDisable,
  isLoading,
  startIcon,
  ...rest
}: QRButtonProps) => {
  return (
    <StyledButton
      {...rest}
      disabled={isDisable || isLoading}
      startIcon={isLoading ? <CircularProgress size={20} /> : startIcon}
      disableElevation
    >
      {children}
    </StyledButton>
  );
};

export default QRButton;
