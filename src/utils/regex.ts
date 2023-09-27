import { equal, lowerCase } from "./javascript";

export const emailValidation = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(lowerCase(email));
};

export const notEmpty = (val: string) => {
  const regex = /\S/;
  return regex.test(val);
};

export const passwordValidation = (value: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(value);
};

export const alphabetValidation = (value: string) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(value);
};

export const confirmPasswordValidation = (
  value: string,
  clonedPassword: string,
) => {
  return equal(value, clonedPassword);
};

export const validPhoneNumber = (phoneNumber: any) => {
  return /^\+?[0-9]+( [A-Za-z]+)?$/.test(phoneNumber);
};

export const urlValidation = (value: string) => {
  const regex =
    /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{3,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$|^((www\.)?[-a-zA-Z0-9@:%._+~#=]{3,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))$/;
  return regex.test(value);
};
