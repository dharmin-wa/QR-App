import React from "react";
import { Button, ButtonOwnProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

interface QRButtonProps extends ButtonOwnProps {
  children?: string | number;
  isDisable?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled(Button)(() => ({
  "&.MuiButton-root": {
    width: "100%",
    borderRadius: 13,
    textTransform: "capitalize",
  },
}));

const QRButton = ({
  children,
  isDisable,
  isLoading,
  startIcon,
  endIcon,
  ...rest
}: QRButtonProps) => {
  return (
    <StyledButton
      {...rest}
      disabled={isDisable || isLoading}
      startIcon={!isLoading && startIcon}
      endIcon={!isLoading && endIcon}
      disableElevation
    >
      {isLoading ? <CircularProgress size={20} /> : children}
    </StyledButton>
  );
};

export default QRButton;
