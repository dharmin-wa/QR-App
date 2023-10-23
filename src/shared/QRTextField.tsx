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
    maxWidth: "100%",
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      {formLabel && (
        <FormLabel
          sx={{
            fontSize: "1.2rem",
            fontWeight: 500,
            lineHeight: "33px",
            letterSpacing: "0",
            color: "#1C1C1C",
          }}
        >
          {formLabel}
        </FormLabel>
      )}
      <StyledTextField {...rest} />
    </div>
  );
};

export default QRTextField;
