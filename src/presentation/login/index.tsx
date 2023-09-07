import React from "react";
import Form from "../../shared/Form";
import LoginContainer from "../../container/login.container";
import QRTextField from "../../shared/QRTextField";
import {
  attribute, defaultValues,
  forgotPasswordLink,
  formPath,
  loginPageTitle,
  login,
  rememberMe
} from "../../description/login.description";
import { attributeTypes } from "../../types";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import QRStack from "../../shared/QRStack";
import { Link } from "react-router-dom";
import { locationPath } from "../../utils/constant";
import QRTypography from "../../shared/QRTypography";
import { IconButton, InputAdornment } from "@mui/material";
import { equal } from "../../utils/javascript";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({ attribute, defaultValues, formPath })

  const { handleSubmit, loadingStatus, handleCheck, toggleVisibility, updatedAtt } = LoginContainer({
    formData,
    validate,
    setError,
    formPath,
    attribute
  })

  return (
    <>
      <QRTypography
        variant="h2"
        fontSize={{ md: 28, xs: 22 }}
        fontWeight={500}
        mb={3}
      >
        {loginPageTitle}
      </QRTypography>
      <Form onSubmit={handleSubmit}>
        {updatedAtt?.map((att: attributeTypes, index: number) => {
          const { label, name, type, startAdornment } = att
          return (
            <QRBox key={index}>
              <QRTextField
                error={!!error?.[name]}
                id={`${name}-${index}`}
                placeholder={label}
                name={name}
                type={type}
                defaultValue={defaultValues?.[name]}
                helperText={error?.[name]}
                onChange={handleChange}
                InputProps={{
                  startAdornment: startAdornment && (
                    <InputAdornment position="start">
                      {equal(name, "password") ? (
                        <IconButton onClick={toggleVisibility}>
                          {startAdornment}
                        </IconButton>
                      ) : (
                        startAdornment
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </QRBox>
          )
        })
        }
        <QRCheckbox name="rememberMe" onChange={handleCheck} />
        <QRStack direction="row"
          alignItems="center"
          dangerouslySetInnerHTML={{
            __html: rememberMe
          }} />
        <Link
          to={locationPath.forgotPassword}
        >
          {forgotPasswordLink}
        </Link>
        <QRButton type="submit"
          variant="contained"
          isLoading={loadingStatus}>{login}</QRButton>
      </Form>
    </>

  )
};

export default Login;
