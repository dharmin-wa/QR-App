import React from "react";
import Form from "../../shared/Form";
import LoginContainer from "../../container/login.container";
import QRTextField from "../../shared/QRTextField";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../description/login.description";
import QRButton from "../../shared/QRButton";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import { Link } from "react-router-dom";
import { locationPath } from "../../utils/constant";
import QRTypography from "../../shared/QRTypography";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import RightArrow from "../../assets/svg/rightArrow.svg";
import QRBox from "../../shared/QRBox";
import GoogleIcon from "../../assets/svg/google.svg";
import Mail from "../../assets/svg/mail.svg";
import Lock from "../../assets/svg/lock.svg";
import { useTranslation } from "react-i18next";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });
  const { t } = useTranslation();

  const {
    handleSubmit,
    loadingStatus,
    handleCheck,
    toggleVisibility,
    showPassword,
    isPwdRemember,
  } = LoginContainer({
    formData,
    validate,
    setError,
    formPath,
  });

  return (
    <QRBox
      display="flex"
      alignItems="center"
      flexDirection="column"
      borderRadius="24px"
      sx={{ background: "#fff" }}
      width="380px"
      margin="auto"
      maxWidth="100%"
      p={2}
    >
      <QRTypography variant="h4" fontWeight={700} p={3}>
        {t("login")}
      </QRTypography>
      <img src={GoogleIcon} alt="sign up with google" />
      <Divider
        sx={{ mt: 2, mb: 2, fontSize: ["12px", "16px", "16px", "16px"] }}
      >
        {t("or")}
      </Divider>

      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <QRTextField
          error={!!error?.email}
          id="email"
          type="text"
          name="email"
          defaultValue={defaultValues?.email}
          placeholder={t("emailAddress")}
          helperText={t(error?.email)}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Mail} alt="Mail Icon" />
              </InputAdornment>
            ),
          }}
        />
        <QRTextField
          error={!!error?.password}
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          defaultValue={defaultValues?.password}
          placeholder={t("password")}
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
                <IconButton onClick={toggleVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <QRBox
          sx={{
            alignItems: "center",
            // justifyContent: "center",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            pb: { xs: 2, md: 2 },
          }}
        >
          <FormControlLabel
            control={
              <QRCheckbox
                name="rememberMe"
                onChange={handleCheck}
                checked={isPwdRemember}
              />
            }
            label={
              <span
                style={{
                  fontSize: 13.39,
                }}
              >
                {t("rememberMe")}
              </span>
            }
          />
          <Link to={locationPath.forgotPassword} style={{ fontSize: 13.39 }}>
            {t("forgotPasswordLink")}
          </Link>
        </QRBox>

        <QRButton
          type="submit"
          variant="contained"
          isLoading={loadingStatus}
          endIcon={<img src={RightArrow} alt="Arrow Icon" />}
        >
          {t("login")}
        </QRButton>
      </Form>
      <QRTypography
        sx={{
          fontSize: 13.39,
          alignItems: "center",
          fontWeight: 700,
          justifyContent: "center",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          pb: { xs: 2 },
        }}
        p={2}
      >
        {t("notHaveAccount")}
        <Link to="/signup" style={{ marginLeft: 3 }}>
          {t("signUp")}
        </Link>
      </QRTypography>
    </QRBox>
  );
};

export default Login;
