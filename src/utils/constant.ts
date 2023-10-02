export const locationPath = {
  homePage: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verifyOTP: "/verify-otp",
  thanks: "/thanks",
};

export const apiEndPoints = {
  login: "api/auth/login",
  signup: "api/auth/signup",
  forgotPassword: "api/auth/forgot-password",
  verifyEmail: "api/email/verify",
  verifyPassword: "auth/forgot-password/verify",
  verifyOTP: "api/auth/forgot-password/verify",
  resendOTP: "auth/resend-otp",
  resetPassword: "api/auth/reset-password",
  createQRs: "api/qrCode/addQrCode",
  getAllQRs: "api/qrCode/listOfQrCode",
};

export const method = {
  post: "post",
  get: "get",
  delete: "delete",
  put: "put",
};

export const email = "email";

export const notEmptyOrNull = "notEmptyOrNull";

export const password = "password";

export const alphabetOnly = "alphabetOnly";

export const confirmPassword = "confirmPassword";
