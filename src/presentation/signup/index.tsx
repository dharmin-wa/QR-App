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
import { Divider, IconButton, InputAdornment } from "@mui/material";
import QRButton from "../../shared/QRButton";
import SignUpContainer from "../../container/signUp.container";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import "./style.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QRBox from "../../shared/QRBox";
import { equal } from "../../utils/javascript";
import GoogleIcon from "../../assets/svg/google.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import RightArrow from "../../assets/svg/rightArrow.svg";
import { Link } from "react-router-dom";
import Mail from "../../assets/svg/mail.svg";
import Lock from "../../assets/svg/lock.svg";

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
    <QRBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius="24px"
      sx={{ background: "#fff" }}
      width="380px"
      margin="auto"
      maxWidth="100%"
      p={2}
    >
      <QRTypography variant="h4" fontWeight={700} p={3}>
        {signUpPageTitle}
      </QRTypography>
      <img src={GoogleIcon} alt="sign up with google" />
      <Divider
        sx={{ mt: 2, mb: 2, fontSize: ["12px", "16px", "16px", "16px"] }}
      >
        Or
      </Divider>
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center"
        }}
      >
        <QRTextField
          error={!!error?.email}
          id="email"
          type="text"
          name="email"
          defaultValue={defaultValues?.email}
          placeholder="email address"
          helperText={error?.email}
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
          placeholder="password"
          helperText={error?.password}
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
        <div className="strength-line">
          <div
            className={`strength-line-fill strength-line-fill-${strength}`}
          ></div>
        </div>
        {equal(strength, 1) && (
          <div className="under-message">
            Password must be at least 8 characters long.
          </div>
        )}
        {strength > 1 && strength <= 4 && (
          <div className="under-message">
            Not bad but you know you can do it better.
          </div>
        )}
        {equal(strength, 5) && (
          <div className="under-message">Strong password! Good job.</div>
        )}
        <QRBox sx={{ mt: 1, mb: { xs: 1.5 } }}>
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
          endIcon={<img src={RightArrow} alt="Arrow Icon" />}
        >
          Sign up for free
        </QRButton>
      </Form>

      <QRTypography
        sx={{
          fontSize: "13.39px",
          alignItems: "center",
          fontWeight: 700,
          justifyContent: "center",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          pb: { xs: 2 },
        }}
        p={2}
      >
        Do you already have an account?{" "}
        <Link to="/login" style={{ marginLeft: 1 }}>
          Log in
        </Link>{" "}
      </QRTypography>
    </QRBox>
  );
};

export default SignUp;
