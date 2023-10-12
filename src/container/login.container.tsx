import { useDispatch, useSelector } from "react-redux";
import { keys, length } from "../utils/javascript";
import { useState, useEffect } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { loadStateFn, removeStateFn, saveStateFn } from "../utils/localStorage";
import { SET_APP_DATA } from "../redux/constants";

interface LoginContainerProps {
  formData: any;
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
  const isRemember = loadStateFn("rememberMe");
  const [isPwdRemember, setIsPwdRemember] = useState<boolean>(
    isRemember || false,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  const { performRequest } = ApiContainer();

  useEffect(() => {
    setIsPwdRemember(isRemember);
  }, []);

  const handleCheck = () => {
    setIsPwdRemember(!isPwdRemember);
  };

  const callApi = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.login,
      method: method.post,
      data: { ...formData },
      showToastMessage: true,
      showErrorToastMessage: true,
      successToastMessage: "Login successful!",
      needLoader: true,
      parent: formPath.parent,
    });
    if (res?.status === 200) {
      const { token, emailVerify, _id } = res.data;
      if (length(token)) {
        saveStateFn("token", token);
        saveStateFn("isAuthenticated", true);
        saveStateFn("id", _id);
      }
      if (isPwdRemember) {
        saveStateFn("rememberedEmail", formData?.email);
        saveStateFn("rememberedPassword", formData?.password);
        saveStateFn("rememberMe", true);
      } else {
        removeStateFn("rememberedEmail");
        removeStateFn("rememberedPassword");
        removeStateFn("rememberMe");
      }
      dispatch({
        type: SET_APP_DATA,
        payload: { isAuthenticated: true, id: _id },
      });
      if (emailVerify) {
        navigate("/dashboard");
      }
    }
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
    isPwdRemember,
  };
};

export default LoginContainer;
