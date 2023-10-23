import { email, notEmptyOrNull } from "../utils/constant";
import { attributeTypes } from "../types";

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
    pattern: notEmptyOrNull,
    error: ["pwdRequired"],
  },
  {
    name: "phoneNo",
    type: "text",
    isRequired: false,
    pattern: notEmptyOrNull,
    error: ["blankSpaceNotAllowed"],
  },
];

export const defaultValues: any = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNo: "",
};

export const formPath = { parent: "profile" };
