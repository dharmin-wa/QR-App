import React from "react";
import Form from "../../shared/Form";
import LoginContainer from "../../container/login.container";
import QRTextField from "../../shared/QRTextField";
import {
  attribute,
  defaultValues,
  forgotPasswordLink,
  formPath,
  loginPageTitle,
  login,
  rememberMe,
} from "../../description/login.description";
import QRButton from "../../shared/QRButton";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import { Link } from "react-router-dom";
import { locationPath } from "../../utils/constant";
import QRTypography from "../../shared/QRTypography";
import { IconButton, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import QRBox from "../../shared/QRBox";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });

  const {
    handleSubmit,
    loadingStatus,
    handleCheck,
    toggleVisibility,
    showPassword,
  } = LoginContainer({
    formData,
    validate,
    setError,
    formPath,
  });

  return (
    <>
      <QRBox sx={{ background: "#fff" }}>
        <QRTypography variant="h4" fontWeight={700} mb={3}>
          {loginPageTitle}
        </QRTypography>
        <Form onSubmit={handleSubmit}>
          <QRTextField
            error={!!error?.email}
            id="email"
            type="text"
            name="email"
            defaultValue={defaultValues?.email}
            placeholder="Email address"
            helperText={error?.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
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
            placeholder="Password"
            helperText={error?.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
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
          <FormControlLabel
            control={<QRCheckbox name="rememberMe" onChange={handleCheck} />}
            label={
              <span
                style={{
                  fontSize: "13.39px",
                }}
              >
                {rememberMe}
              </span>
            }
          />
          <Link
            to={locationPath.forgotPassword}
            style={{ fontSize: "13.39px" }}
          >
            {" "}
            {forgotPasswordLink}
          </Link>
          <QRButton
            type="submit"
            variant="contained"
            isLoading={loadingStatus}
            endIcon={<ArrowCircleRightIcon />}
          >
            {login}
          </QRButton>
        </Form>
        <QRTypography sx={{ fontSize: "13.39px" }}>
          Don’t have an account? <Link to="/signup">Sign up </Link>{" "}
        </QRTypography>
      </QRBox>
    </>
  );
};

export default Login;
