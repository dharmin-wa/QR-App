import {
  alphabetOnly,
  confirmPassword,
  email,
  notEmptyOrNull,
  password,
} from "./constant";
import {
  emailValidation,
  notEmpty,
  passwordValidation,
  alphabetValidation,
  confirmPasswordValidation,
} from "./regex";

export default (pattern: string, value: string, formData: any) => {
  switch (pattern) {
    case notEmptyOrNull:
      return notEmpty(value);
    case password:
      return passwordValidation(value);
    case email:
      return emailValidation(value);
    case alphabetOnly:
      return alphabetValidation(value);
    case confirmPassword:
      return confirmPasswordValidation(value, formData?.password);
    default:
      return false;
  }
};
