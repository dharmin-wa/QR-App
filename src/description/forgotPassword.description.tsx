import { ReactComponent as Email } from "../assets/svg/mail.svg";
import { attributeTypes } from "../types";
import { email } from "../utils/constant";

export const attribute: attributeTypes[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    endAdornment: <Email />,
    pattern: email,
    error: ["Email Required", "Invalid Email"],
  },
];

export const defaultValues: any = {
  email: "",
};

export const pageTitle = "Forgot Password?";

export const verifyEmail = "Verify Email";

export const formPath = { parent: "forgot-password" };
