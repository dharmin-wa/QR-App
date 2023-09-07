import { ReactComponent as Email } from "../assets/svg/mail.svg";
import { email, notEmptyOrNull } from "../utils/constant";
import { loadStateFn } from "../utils/localStorage";
import { attributeTypes } from "../types";

export const attribute: attributeTypes[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    startAdornment: <Email />,
    pattern: email,
    error: ["Email Required", "Invalid Email"],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["Password Required"],
  },
]

export const defaultValues: any = {
  email: loadStateFn("rememberedEmail") || "",
  password: loadStateFn("rememberedPassword") || "",
};

export const login = "login";

export const loginPageTitle = "Log In to Your Account";

export const rememberMe = "Remember me";

export const forgotPasswordLink = "Forgot Password";

export const formPath = { parent: "logIn" };