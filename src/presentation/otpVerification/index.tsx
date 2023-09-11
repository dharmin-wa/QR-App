import React from "react";
import QRBox from "../../shared/QRBox";
import QRTypography from "../../shared/QRTypography";
import QROtpInput from "../../shared/QROtpInput";
import OtpVerificationContainer from "../../container/otpVerification.container";
import { ternary } from "../../utils/javascript";
import QRButton from "../../shared/QRButton";
import { numberOfInputField } from "../../description/otpVerification.description";
import { formPath } from "../../description/forgotPassword.description"

const OtpVerification = () => {
  const { otp, handleInputChange, otpError, timer, email, handleResendOTP } = OtpVerificationContainer({ formPath });
  return (
    <QRBox>
      <QRTypography>OTP VERIFICATION</QRTypography>
      <QRTypography>Enter the OTP sent to - {email}</QRTypography>
      <QROtpInput
        numInputs={numberOfInputField}
        value={otp}
        onChange={handleInputChange}
        inputStyle={ternary(otpError, { color: "red", borderColor: "red" }, {})}
        renderInput={(props: any) => <input {...props} />}
      />
      <QRTypography>00:{timer} Sec</QRTypography>
      <QRTypography>
        Don’t receive code ? <QRTypography onClick={handleResendOTP}> Re-send</QRTypography>
      </QRTypography>
      <QRButton variant="contained">Submit</QRButton>
    </QRBox>
  );
};

export default OtpVerification;
