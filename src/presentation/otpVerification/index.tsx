import React from "react";
import QRBox from "../../shared/QRBox";
import QRTypography from "../../shared/QRTypography";
import { Typography } from "@mui/material";
import QROtpInput from "../../shared/QROtpInput";
import OtpVerificationContainer from "../../container/otpVerification.container";

import { ternary, upperCase } from "../../utils/javascript";
import QRButton from "../../shared/QRButton";
import {
  numberOfInputField,
  formPath,
} from "../../description/otpVerification.description";

import RightArrow from "../../assets/svg/rightArrow.svg";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const OtpVerification = () => {
  const {
    otp,
    handleInputChange,
    otpError,
    timer,
    email,
    handleResendOTP,
    loadingStatusSubmit,
    loadingStatusResend,
    handleSubmitOTP,
    minutes,
    seconds,
  } = OtpVerificationContainer({ formPath });
  const { t } = useTranslation();

  return (
    <QRBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ background: "#fff" }}
      borderRadius="24px"
      width="450px"
      margin="auto"
      maxWidth="100%"
      p={2}
    >
      <div
        style={{
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {upperCase(t("otpVerification"))}
        </Typography>
      </div>
      <QRTypography
        color={"#4E4D4D"}
        fontSize={["10px", "16px", "16px", "16px"]}
        padding="30px 0 30px 0"
      >
        {t("enterOtp")} -{" "}
        <span style={{ color: "#000000", fontWeight: 700 }}>{email || ""}</span>
      </QRTypography>
      <QROtpInput
        numInputs={numberOfInputField}
        value={otp}
        onChange={handleInputChange}
        inputStyle={ternary(
          otpError,
          { color: "red", border: "0.5px solid red" },
          {},
        )}
        renderInput={(props) => <input {...props} />}
      />
      <QRTypography lineHeight={3} fontWeight={500}>
        {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`} Sec
      </QRTypography>
      <QRTypography padding="30px 0 30px 0">
        {t("notReceiveCode")} ?{" "}
        <span
          onClick={timer === 0 ? handleResendOTP : undefined}
          style={{
            color: timer === 0 ? "#000000" : "#4e4d4d6e",
            fontWeight: 700,
            cursor: "pointer",
            justifyContent: "center",
          }}
        >
          {" "}
          {loadingStatusResend ? (
            <CircularProgress size={20} />
          ) : (
            t("resendOtp")
          )}
        </span>
      </QRTypography>
      <QRButton
        variant="contained"
        endIcon={<img src={RightArrow} alt="Arrow Icon" />}
        isLoading={loadingStatusSubmit}
        onClick={handleSubmitOTP}
      >
        {t("submit")}
      </QRButton>
    </QRBox>
  );
};

export default OtpVerification;
