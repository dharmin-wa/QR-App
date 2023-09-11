import { useSelector } from "react-redux";
import { keys } from "../utils/javascript";
import { useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";

interface LoginContainerProps {
  formData: any;
  // eslint-disable-next-line no-unused-vars
  validate: (name: string, value: any) => void;
  setError: any;
  formPath: any;
}

const LoginContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: LoginContainerProps) => {
  const [isPwdRemember, setIsPwdRemember] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  const { performRequest } = ApiContainer();

  const handleCheck = () => {
    setIsPwdRemember(!isPwdRemember);
  };

  const callApi = async () => {
    performRequest({
      endPoint: apiEndPoints?.login,
      method: method.post,
      data: { ...formData },
      showToastMessage: true,
      needLoader: true,
      parent: formPath.parent,
    });
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
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
    showPassword,
  };
};

export default LoginContainer;
