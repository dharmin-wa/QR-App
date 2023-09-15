/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { equal, keys } from "../utils/javascript";
import { loadStateFn, saveStateFn } from "../utils/localStorage";
import {
  numberOfInputField,
  otpResendTime,
} from "../description/otpVerification.description";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { attributeTypes } from "../types";

interface OtpVerificationContainerProps {
  formData: any;
  validate: (name: string, value: any) => void;
  setError: any;
  formPath: any;
  attribute: attributeTypes[];
}

const OtpVerificationContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: OtpVerificationContainerProps) => {
  const [otp, setOtp] = useState<string>();
  const [otpError, setOtpError] = useState(false);
  const { performRequest } = ApiContainer();
  const otpInputRef: any = useRef(null);
  const navigate: any = useNavigate();

  const emailVerify = loadStateFn("email-verify");
  const initialTimerValue =
    +loadStateFn("otp-timer") ||
    (!isExpired(emailVerify?.token) ? otpResendTime : undefined);

  const [timer, setTimer] = useState(initialTimerValue || 0);

  const loadingStatusSubmit = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );
  const loadingStatusResend = useSelector(
    (state: any) => state.api?.loader?.[formPath?.child],
  );
  useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<any>({
    password: false,
    confirm_password: false,
  });

  useEffect(() => {
    verifyEmail();
  }, []);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      if (timer !== 0) {
        setTimer((preTime) => {
          if (preTime > 0) {
            saveStateFn("otp-timer", preTime - 1);
            return preTime - 1;
          }
          return 0;
        });
      }
    }, 1000);
    return () => {
      clearInterval(intervalTimer);
    };
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const verifyEmail = () => {
    if (!emailVerify?.email) {
      return navigate(-1, { replace: true });
    }
  };

  const handleInputChange = (value: any) => {
    if (equal(value?.length, 6)) setOtpError(false);
    setOtp(value);
  };

  const toggleVisibility = (name: string) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };

  const handleResendOTP = async () => {
    const { email } = emailVerify;
    const payload = { email };

    const res: any = await performRequest({
      endPoint: apiEndPoints?.forgotPassword,
      method: method.post,
      data: payload,
      showToastMessage: true,
      successToastMessage: "OTP sent successfully",
      needLoader: true,
      parent: formPath.child,
    });
    if (equal(res?.status, 200)) {
      setOtp("");

      saveStateFn("email-verify", {
        token: res?.data?.token,
        email,
      });
      setTimer(otpResendTime);
    }
  };

  const callApi = async () => {
    const { token } = emailVerify;
    const payload = {
      otp,
      token,
      password: formData?.password,
    };

    const response: any = await performRequest({
      endPoint: apiEndPoints?.resetPassword,
      method: method.post,
      data: payload,
      token: emailVerify?.token,
      showToastMessage: true,
      parent: formPath?.parent,
      needLoader: true,
    });
    if (equal(response?.status, 200)) {
      navigate("/password-recovery-success");
    }
  };

  const handleSubmitOTP = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors: any = {};
    keys(formData).forEach((name) => {
      const error: any = validate(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    const combinedErrors: any = { ...validationErrors };

    if (!otp || otp?.length < numberOfInputField) {
      combinedErrors.otpError = true;
    }

    setError(combinedErrors);
    setOtpError(combinedErrors?.otpError);

    if (keys(combinedErrors).length === 0) {
      callApi();
    }
  };

  return {
    otp,
    otpError,
    handleInputChange,
    handleResendOTP,
    timer,
    email: emailVerify?.email,
    otpInputRef,
    loadingStatusSubmit,
    loadingStatusResend,
    handleSubmitOTP,
    minutes,
    seconds,
    toggleVisibility,
    showPassword,
  };
};

export default OtpVerificationContainer;
