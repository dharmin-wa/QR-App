import { attributeTypes } from "../types";
import { email, notEmptyOrNull, password } from "../utils/constant";

export const attribute: attributeTypes[] = [
  {
    name: "firstName",
    type: "text",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["required", "blankSpaceNotAllowed"],
  },
  {
    name: "lastName",
    type: "text",
    isRequired: true,
    pattern: notEmptyOrNull,
    error: ["required", "blankSpaceNotAllowed"],
  },
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
  firstName: "",
  lastName: "",
};

export const formPath = { parent: "signUp" };
