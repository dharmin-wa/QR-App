import React from "react";
import QRTextField from "./QRTextField";
import { InputAdornment } from "@mui/material";

interface FormFieldsProps {
  attr?: Array<any>;
  attribute?: Array<any>;
  error: any;
  formData: any;
  handleChange: any;
}

const FormFields = ({
  attribute,
  error,
  formData,
  handleChange,
}: FormFieldsProps) => {
  const setForm = ({
    attr,
    error,
    formData,
    handleChange,
  }: FormFieldsProps) => {
    return attr?.map(
      (
        {
          name,
          label,
          type,
          placeholder,
          startAdornment,
          endAdornment,
          ...rest
        },
        index: number,
      ) => {
        switch (type) {
          case "text":
          case "email":
          case "password":
            return (
              <QRTextField
                {...rest}
                error={!!error?.[name]}
                name={name}
                id={`${name}-${index}`}
                helperText={error?.[name]}
                onChange={(e: any) => handleChange(e)}
                label={label}
                value={formData?.[name]}
                type={type}
                placeholder={placeholder}
                InputProps={{
                  endAdornment: endAdornment && (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ),
                  startAdornment: startAdornment && (
                    <InputAdornment position="start">
                      {startAdornment}
                    </InputAdornment>
                  ),
                }}
              />
            );

          default:
            break;
        }
      },
    );
  };

  return <>{setForm({ attr: attribute, error, formData, handleChange })}</>;
};

export default FormFields;
