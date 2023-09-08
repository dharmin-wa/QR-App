import React from "react";
import QRTypography from "../../shared/QRTypography";
import {
  attribute,
  pageTitle,
  formPath,
  submit,
  defaultValues,
} from "../../description/forgotPassword.description";
import Form from "../../shared/Form";
import { attributeTypes } from "../../types";
import QRBox from "../../shared/QRBox";
import QRTextField from "../../shared/QRTextField";
import { InputAdornment } from "@mui/material";
import QRButton from "../../shared/QRButton";
import ForgotPasswordContainer from "../../container/forgotPassword.container";
import FormContainer from "../../container/form.container";

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
    <>
      <QRTypography
        variant="h2"
        fontSize={{ md: 28, xs: 22 }}
        fontWeight={500}
        mb={3}
      >
        {pageTitle}
      </QRTypography>
      <Form onSubmit={handleSubmit}>
        {attribute?.map((att: attributeTypes, index: number) => {
          const { label, name, endAdornment, type } = att;
          return (
            <QRBox key={index}>
              <QRTextField
                error={!!error?.[name]}
                id={`${name}-${index}`}
                label={label}
                name={name}
                type={type}
                defaultValue={defaultValues?.[name]}
                helperText={error?.[name]}
                onChange={handleChange}
                InputProps={{
                  endAdornment: endAdornment && (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ),
                }}
              />
            </QRBox>
          );
        })}
        <QRButton type="submit" variant="contained" isLoading={loadingStatus}>
          {submit}
        </QRButton>
      </Form>
    </>
  );
};

export default ForgotPassword;
