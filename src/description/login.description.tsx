import { ReactComponent as Email } from "../assets/svg/mail.svg";
import { ReactComponent as Lock } from "../assets/svg/lock.svg";
import { email, notEmptyOrNull } from "../utils/constant";
import { loadStateFn } from "../utils/localStorage";

export const attribute = [
  {
    name: "email",
    label: "emailOrUsername",
    type: "email",
    isRequired: true,
    endAdornment: <Email />,
    pattern: email,
    error: ["emailRequired", "invalidEmail"],
    gridXs: 12,
  },
  {
    name: "password",
    label: "password",
    type: "password",
    isRequired: true,
    endAdornment: <Lock />,
    pattern: notEmptyOrNull,
    error: ["passwordRequired"],
    gridXs: 12,
  },
]

export const defaultValues = {
  email: loadStateFn("rememberedEmail") || "",
  password: loadStateFn("rememberedPassword") || "",
};

export const formPath = { parent: "logIn" };