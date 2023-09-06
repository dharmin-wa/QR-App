import {
  alphabetOnly,
  email,
  notEmptyOrNull,
  password,
} from "./constant";
import {
  emailValidation,
  notEmpty,
  passwordValidation,
  alphabetValidation,
} from "./regex";

export default (pattern: string, value: string) => {
  switch (pattern) {
    case notEmptyOrNull:
      return notEmpty(value);
    case password:
      return passwordValidation(value);
    case email:
      return emailValidation(value);
    case alphabetOnly:
      return alphabetValidation(value);
    default:
      return false;
  }
};
