import { attributeTypes } from "../types";
import { email, password } from "../utils/constant";
import EmailIcon from '@mui/icons-material/Email';

export const attribute: attributeTypes[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    startAdornment: <EmailIcon />,
    pattern: email,
    error: ["Email Required", "Invalid Email"],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    isRequired: true,
    pattern: password,
    error: ["Password Required", ""],
  },
]

export const defaultValues: any = {
  email: "",
  password: "",
};

export const signUp = "signup";

export const signUpPageTitle = "Sign up";

export const termAndConditions = "I agree to <a href='#'> terms and conditions</a>";

export const createAccount = "Create an account";

export const formPath = { parent: "signUp" };