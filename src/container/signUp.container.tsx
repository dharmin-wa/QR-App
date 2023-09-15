import { useEffect, useState } from "react";
import { keys } from "../utils/javascript";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useSelector } from "react-redux";
import { showToast } from "../utils/toastService";
import { useTranslation } from "react-i18next";
import { attributeTypes } from "../types";

interface SignUpContainerProps {
  formData: any;
  validate: (name: string, value: any) => void;
  setError: any;
  formPath: any;
  attribute: attributeTypes[];
}

const SignUpContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: SignUpContainerProps) => {
  const [agreeTC, setAgreeTC] = useState<boolean>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [strength, setStrength] = useState(0);
  const { t } = useTranslation();
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    calculateStrength(formData?.password);
  }, [formData?.password]);

  const calculateStrength = (password: string) => {
    let newStrength = 0;

    if (password.length >= 8) {
      newStrength++;
    }

    if (/[A-Z]/.test(password)) {
      newStrength++;
    }

    if (/[a-z]/.test(password)) {
      newStrength++;
    }

    if (/[0-9]/.test(password)) {
      newStrength++;
    }

    if (/\W/.test(password)) {
      newStrength++;
    }

    setStrength(newStrength);
  };

  const handleCheck = () => {
    setAgreeTC(!agreeTC);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const callApi = async () => {
    if (!agreeTC) {
      showToast(t("agreeTermAndCondition"));
      return;
    }
    performRequest({
      endPoint: apiEndPoints?.signup,
      method: method.post,
      data: { ...formData, termAndCondition: agreeTC },
      showToastMessage: true,
      successToastMessage: "Sign up successfully!",
      needLoader: true,
      parent: formPath.parent,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors: any = {};
    keys(formData).forEach((name) => {
      const error: any = validate(name, formData[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    callApi();
  };

  return {
    handleSubmit,
    loadingStatus,
    handleCheck,
    toggleVisibility,
    strength,
    showPassword,
  };
};

export default SignUpContainer;
