import { useState, useEffect, useRef } from "react";
import { equal } from "../utils/javascript";
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

interface OtpVerificationContainerProps {
  formPath: any;
}

const OtpVerificationContainer = ({
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

  useEffect(() => {
    verifyToken();
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

  const verifyToken = () => {
    if (!emailVerify?.email) {
      return navigate(-1, { replace: true });
    }
  };

  const handleInputChange = (value: any) => {
    if (equal(value?.length, 6)) setOtpError(false);
    setOtp(value);
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
    };

    const response: any = await performRequest({
      endPoint: apiEndPoints?.verifyOTP,
      method: method.post,
      data: payload,
      token: emailVerify?.token,
      showToastMessage: true,
      parent: formPath?.parent,
      needLoader: true,
    });
    if (equal(response?.status, 200)) {
      navigate("/reset-password");
    }
  };

  const handleSubmitOTP = () => {
    if (!otp || otp?.length < numberOfInputField) return setOtpError(true);
    callApi();
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
  };
};

export default OtpVerificationContainer;
