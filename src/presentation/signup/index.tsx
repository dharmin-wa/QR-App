import React from "react";
import QRTypography from "../../shared/QRTypography";
import { attribute, signUpPageTitle, defaultValues, formPath, signUp, termAndConditions } from "../../description/signUp.description";
import Form from "../../shared/Form";
import { attributeTypes } from "../../types";
import QRBox from "../../shared/QRBox";
import QRTextField from "../../shared/QRTextField";
import { IconButton, InputAdornment } from "@mui/material";
import QRButton from "../../shared/QRButton";
import SignUpContainer from "../../container/signUp.container";
import FormContainer from "../../container/form.container";
import QRCheckbox from "../../shared/QRCheckbox";
import QRStack from "../../shared/QRStack";
import { equal } from "../../utils/javascript";
import "./style.css"

const SignUp: React.FC = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({ attribute, defaultValues, formPath })

  const { handleSubmit, loadingStatus, handleCheck, toggleVisibility, updatedAtt, strength } = SignUpContainer({
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
        {signUpPageTitle}
      </QRTypography>
      <Form onSubmit={handleSubmit}>
        {updatedAtt?.map((att: attributeTypes, index: number) => {
          const { label, name, type, startAdornment } = att
          return (
            <QRBox key={index}>
              <QRTextField
                error={!!error?.[name]}
                id={`${name}-${index}`}
                type={type}
                name={name}
                defaultValue={defaultValues?.[name]}
                placeholder={label}
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
              {equal(name, "password") &&
                <QRBox>
                  <div className="strength-line">
                    <div
                      className={`strength-line-fill strength-line-fill-${strength}`}
                    ></div>
                  </div>
                  {equal(strength, 0) && (
                    <div className="under-message">Password must be at least 8 characters long.</div>
                  )}
                  {strength > 0 && strength <= 4 && (
                    <div className="under-message">Not bad but you know you can do it better.</div>
                  )}
                  {equal(strength, 5) && (
                    <div className="under-message">Strong password! Good job.</div>
                  )}
                </QRBox>
              }
            </QRBox>
          )
        })
        }
        <QRCheckbox name="termAndConditions" onChange={handleCheck} />
        <QRStack direction="row"
          alignItems="center"
          dangerouslySetInnerHTML={{
            __html: termAndConditions
          }} />
        <QRButton type="submit"
          variant="contained"
          isLoading={loadingStatus}>{signUp}</QRButton>
      </Form>
      <img src={formData?.profile_pic
      } />
    </>
  )
};

export default SignUp;
