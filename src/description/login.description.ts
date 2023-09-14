import { email, notEmptyOrNull } from "../utils/constant";
import { loadStateFn } from "../utils/localStorage";
import { attributeTypes } from "../types";

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
    pattern: notEmptyOrNull,
    error: ["pwdRequired"],
  },
];

export const defaultValues: any = {
  email: loadStateFn("rememberedEmail") || "",
  password: loadStateFn("rememberedPassword") || "",
};

export const formPath = { parent: "logIn" };
