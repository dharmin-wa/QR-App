import React from "react";
import QRBox from "../../shared/QRBox";
import QRTypography from "../../shared/QRTypography";
import { Typography } from "@mui/material";
import QROtpInput from "../../shared/QROtpInput";
import OtpVerificationContainer from "../../container/otpVerification.container";

import { ternary } from "../../utils/javascript";
import QRButton from "../../shared/QRButton";
import {
  numberOfInputField,
  formPath,
  attribute,
  defaultValues,
} from "../../description/otpVerification.description";
import RightArrow from "../../assets/svg/rightArrow.svg";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormContainer from "../../container/form.container";
import QRTextField from "../../shared/QRTextField";
import Lock from "../../assets/svg/lock.svg";
import Form from "../../shared/Form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const OtpVerification = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });

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
    toggleVisibility,
    showPassword,
  } = OtpVerificationContainer({
    formData,
    formPath,
    validate,
    setError,
    attribute,
  });
  const { t } = useTranslation();

  return (
    <QRBox
      sx={{ background: "#fff" }}
      borderRadius="24px"
      width="528px"
      margin="auto"
      maxWidth="100%"
      p={3}
    >
      <Typography variant="h4" fontWeight={700}>
        {t("passwordVerification")}
      </Typography>
      <QRTypography
        color={"#4E4D4D"}
        fontSize={["10px", "16px", "16px", "16px"]}
        padding="30px 0 30px 0"
      >
        {t("enterOtp")} -{" "}
        <span style={{ color: "#000000", fontWeight: 700 }}>{email || ""}</span>
      </QRTypography>
      <Form
        onSubmit={handleSubmitOTP}
        style={{
          minWidth: "100%",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
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
        </div>

        <QRTypography lineHeight={3} fontWeight={500}>
          {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`} Sec
        </QRTypography>
        <QRTypography
          padding="20px 0 20px 0"
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {t("notReceiveCode")}?
          <span
            onClick={timer === 0 ? handleResendOTP : undefined}
            style={{
              color: timer === 0 ? "#000000" : "#4e4d4d6e",
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              paddingLeft: 3
            }}
          >
            {!loadingStatusResend ? (
              <CircularProgress size={15} sx={{ mt: 0.5 }} />
            ) : (
              t("resendOtp")
            )}
          </span>
        </QRTypography>
        <QRBox sx={{ p: { lg: 2 } }}>
          <QRTextField
            error={!!error?.password}
            id="password"
            type={showPassword.password ? "text" : "password"}
            name="password"
            fullWidth
            defaultValue={defaultValues?.password}
            placeholder={t("setNewPassword")}
            helperText={t(error?.password)}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={Lock} alt="Lock Icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleVisibility("password")}>
                    {showPassword.password ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <QRTextField
            error={!!error?.confirm_password}
            id="confirm_password"
            type={showPassword.confirm_password ? "text" : "password"}
            name="confirm_password"
            fullWidth
            defaultValue={defaultValues?.confirm_password}
            placeholder={t("confirmPassword")}
            helperText={t(error?.confirm_password)}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={Lock} alt="Lock Icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => toggleVisibility("confirm_password")}
                  >
                    {showPassword.confirm_password ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </QRBox>

        <QRButton
          type="submit"
          variant="contained"
          endIcon={<img src={RightArrow} alt="Arrow Icon" />}
          isLoading={loadingStatusSubmit}
        >
          {t("submit")}
        </QRButton>
      </Form>
    </QRBox>
  );
};

export default OtpVerification;
