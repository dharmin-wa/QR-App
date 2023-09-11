/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { equal, typeOf } from "../utils/javascript";
import { loadStateFn, saveStateFn } from "../utils/localStorage";
import { otpResendTime } from "../description/otpVerification.description";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";

interface OtpVerificationContainerProps {
  formPath: any;
}

const OtpVerificationContainer = ({ formPath }: OtpVerificationContainerProps) => {
  const [otp, setOtp] = useState();
  const [otpError, setOtpError] = useState(false);
  const { performRequest } = ApiContainer();
  const otpInputRef: any = useRef(null);

  const emailVerify = (loadStateFn("email-verify"));
  const [timer, setTimer] = useState(+loadStateFn("otp-time") || otpResendTime);

  useEffect(() => {
    if (timer !== 0) {
      setTimeout(() => {
        setTimer((preTime) => {
          saveStateFn("otp-time", preTime - 1);
          return preTime - 1;
        });
      }, 1000);
    }
  }, [timer]);

  /*  const handleInputChange = (value: any) => {
     if (equal(value?.length, 6)) setOtpError(false);
     setOtp(value);
   }; */

  const handleInputChange = (value: any) => {
    console.log('value,typeof value', value, typeof value)
    if (/^[0-9]+$/.test(value)) {
      setOtp(value);
    } else {
      setOtpError(false)
    }
  };


  const handleResendOTP = async () => {
    const payload = { email: emailVerify?.email }
    const res: any = await performRequest({
      endPoint: apiEndPoints?.forgotPassword,
      method: method.post,
      data: payload,
      showToastMessage: true,
      successToastMessage: "OTP sent successfully",
      needLoader: true,
      parent: formPath.child,
    });
    console.log('res', res)
  }

  return { otp, otpError, handleInputChange, handleResendOTP, timer, email: emailVerify?.email, otpInputRef };
};

export default OtpVerificationContainer;
