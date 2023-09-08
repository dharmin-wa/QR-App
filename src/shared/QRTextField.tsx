import { StandardTextFieldProps, FormLabel, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface QRTextFieldProps extends StandardTextFieldProps {
  formLabel?: string | number;
}

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: 8,
    marginBottom: 23,
    maxWidth: 285,
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    position: "absolute",
    top: 54,
    left: 0,
  },
}));

const QRTextField = ({ formLabel, ...rest }: QRTextFieldProps) => {
  return (
    <>
      {formLabel && (
        <FormLabel
          sx={{
            color: "primary.dark",
            fontSize: 14,
            marginBottom: 1,
            display: "block",
          }}
        >
          {formLabel}
        </FormLabel>
      )}
      <StyledTextField {...rest} />
    </>
  );
};

export default QRTextField;
