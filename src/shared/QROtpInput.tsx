/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import OTPInput, { OTPInputProps } from "react-otp-input";
import QRStack from "./QRStack";

const OtpWrapper = styled(QRStack)(() => ({
  "& > div": {
    justifyContent: "center",
  },
  "& input": {
    width: "60px !important",
    height: 60,
    border: "1px solid #ddd",
    padding: 10,
    margin: "0 6px",
    borderRadius: 15,
    fontSize: 18,
    "&:focus-visible, &:focus": {
      outline: "none",
    },
  },
}));

const QROtpInput = ({
  value,
  onChange,
  inputStyle,
  numInputs,
}: any) => {
  return (
    <OtpWrapper>
      <OTPInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        renderInput={(props) => <input {...props} />}
        inputStyle={inputStyle}
      />
    </OtpWrapper>
  );
};

export default QROtpInput;
