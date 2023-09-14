import { attributeTypes } from "../types";
import { email } from "../utils/constant";

export const attribute: attributeTypes[] = [
  {
    name: "email",
    type: "email",
    isRequired: true,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
  },
];

export const defaultValues: any = {
  email: "",
};

export const formPath = { parent: "forgot-password" };
