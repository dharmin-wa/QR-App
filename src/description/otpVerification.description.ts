import { attributeTypes } from "../types";
import { confirmPassword, password } from "../utils/constant";

export const attribute: attributeTypes[] = [
  {
    name: "password",
    type: "password",
    isRequired: true,
    pattern: password,
    error: ["pwdRequired", "passwordValidation"],
  },
  {
    name: "confirm_password",
    type: "password",
    isRequired: true,
    pattern: confirmPassword,
    error: ["pwdRequired", "notMatch"],
  },
];

export const otpResendTime: number = 300;

export const numberOfInputField: number = 6;

export const defaultValues: any = {
  password: "",
  confirm_password: "",
};

export const formPath = {
  parent: "email_verify",
  child: "resend_otp",
};
