import React from "react";
import QRTypography from "../../shared/QRTypography";
import {
  attribute,
  signUpPageTitle,
  defaultValues,
  formPath,
} from "../../description/signUp.description";
import Form from "../../shared/Form";
import QRTextField from "../../shared/QRTextField";
import { IconButton, InputAdornment } from "@mui/material";
import QRButton from "../../shared/QRButton";
import SignUpContainer from "../../container/signUp.container";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import "./style.css";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QRBox from "../../shared/QRBox";
import { equal } from "../../utils/javascript";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "../../assets/svg/google.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
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
    strength,
  } = SignUpContainer({
    formData,
    validate,
    setError,
    formPath,
    attribute,
  });

  return (
    <QRBox sx={{ background: "#fff" }}>
      <QRTypography
        variant="h4"
        // fontSize={{ md: 28, xs: 40 }}
        fontWeight={700}
        // mb={4}
        // mt={4}
      >
        {signUpPageTitle}
      </QRTypography>
      <img src={GoogleIcon} alt="sign up with google" />
      <QRTypography sx={{ mt: 2, mb: 2 }}>Or</QRTypography>
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
        <QRBox sx={{}}>
          <div className="strength-line">
            <div
              className={`strength-line-fill strength-line-fill-${strength}`}
            ></div>
          </div>
          {/*  {equal(strength, 0) && (
            <div className="under-message">
              Password must be at least 8 characters long.
            </div>
          )} */}
          {strength > 0 && strength <= 4 && (
            <div className="under-message">
              Not bad but you know you can do it better.
            </div>
          )}
          {equal(strength, 5) && (
            <div className="under-message">Strong password! Good job.</div>
          )}
        </QRBox>
        <QRBox sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <FormControlLabel
            control={
              <QRCheckbox name="termAndConditions" onChange={handleCheck} />
            }
            label={
              <span
                style={{
                  fontSize: "13.39px",
                }}
              >
                I agree to <Link to="">terms and conditions</Link>
              </span>
            }
          />
        </QRBox>
        <QRButton
          type="submit"
          variant="contained"
          isLoading={loadingStatus}
          endIcon={<ArrowCircleRightIcon />}
        >
          Sign up for free
        </QRButton>
      </Form>

      <QRTypography sx={{ fontSize: "13.39px" }}>
        Do you already have an account? <Link to="/login">Log in</Link>{" "}
      </QRTypography>
    </QRBox>
  );
};

export default SignUp;
