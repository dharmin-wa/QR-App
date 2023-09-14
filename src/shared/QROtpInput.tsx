import styled from "@emotion/styled";
import OTPInput, { OTPInputProps } from "react-otp-input";
import QRStack from "./QRStack";

const OtpWrapper = styled(QRStack)(({ theme }: any) => ({
  "& > div": {
    justifyContent: "space-around",
  },
  "& input": {
    width: "58px !important",
    height: "58px",
    border: "0px solid #ddd",
    padding: "10px",
    margin: "0 6px",
    borderRadius: "10px",
    fontSize: "18px",
    boxShadow: "-4px -2px 4px 0px rgba(0, 0, 0, 0.12)",
    "&:focus-visible, &:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("lg")]: {
      width: "52px !important",
      height: "52px",
      fontSize: "14px",
      margin: "0 3px",
      [theme.breakpoints.down("md")]: {
        width: "42px !important",
        height: "42px",
        [theme.breakpoints.down("sm")]: {
          width: "32px !important",
          height: "32px",
        },
      },
    },
  },
}));

const QROtpInput = ({
  value,
  onChange,
  inputStyle,
  numInputs,
}: OTPInputProps) => {
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
