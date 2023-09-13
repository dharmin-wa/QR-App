import { attributeTypes } from "../types";
import { email, password } from "../utils/constant";

export const attribute: attributeTypes[] = [
  {
    name: "email",
    type: "email",
    isRequired: true,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
  },
  {
    name: "password",
    type: "password",
    isRequired: true,
    pattern: password,
    error: ["pwdRequired", " "],
  },
];

export const defaultValues: any = {
  email: "",
  password: "",
};

export const formPath = { parent: "signUp" };
