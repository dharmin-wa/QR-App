import React from "react";
import QRTypography from "../../shared/QRTypography";
import {
  attribute,
  pageTitle,
  formPath,
  defaultValues,
  verifyEmail,
} from "../../description/forgotPassword.description";
import Form from "../../shared/Form";
import Mail from "../../assets/svg/mail.svg";
import QRBox from "../../shared/QRBox";
import QRTextField from "../../shared/QRTextField";
import { InputAdornment } from "@mui/material";
import QRButton from "../../shared/QRButton";
import ForgotPasswordContainer from "../../container/forgotPassword.container";
import FormContainer from "../../container/form.container";
import RightArrow from "../../assets/svg/rightArrow.svg";

const ForgotPassword = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });
  const { handleSubmit, loadingStatus } = ForgotPasswordContainer({
    formData,
    validate,
    setError,
    formPath,
  });

  return (
    <QRBox
      display="flex"
      flexDirection="column"
      borderRadius={3}
      sx={{ background: "#fff" }}
      width="380px"
      margin="auto"
      maxWidth="100%"
      p={2}
    >
      <QRTypography variant="h4" fontWeight={700} pb={3}>
        {pageTitle}
      </QRTypography>
      <QRTypography sx={{ fontSize: "14px", pb: 3, color: "#5B5858" }}>
        Don’t worry ! It happens. Please enter the Email Id we will send the OTP
        in this Email.
      </QRTypography>
      <Form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <QRTextField
          error={!!error?.email}
          id="email"
          type="text"
          name="email"
          defaultValue={defaultValues?.email}
          placeholder="email address"
          helperText={error?.email}
          fullWidth
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Mail} alt="Mail Icon" />
              </InputAdornment>
            ),
          }}
        />
        <QRButton
          type="submit"
          variant="contained"
          isLoading={loadingStatus}
          endIcon={<img src={RightArrow} alt="Arrow Icon" />}
        >
          {verifyEmail}
        </QRButton>
      </Form>
    </QRBox>
  );
};

export default ForgotPassword;
