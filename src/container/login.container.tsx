import { useSelector } from "react-redux"
import { equal, keys } from "../utils/javascript"
import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface LoginContainerProps {
  formData: any
  // eslint-disable-next-line no-unused-vars
  validate: (name: string, value: any) => void
  setError: any
  formPath: any
  attribute: any
}

const LoginContainer = ({ formData, validate, setError, formPath, attribute }: LoginContainerProps) => {
  const [isPwdRemember, setIsPwdRemember] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [updatedAtt, setUpdatedAtt] = useState<Array<any>>(attribute)

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  const { performRequest } = ApiContainer();

  useEffect(() => {
    setUpdatedAtt((attribute) =>
      attribute.map((att) => {
        const { name } = att;
        const isPassword = equal(name, "password");

        return {
          ...att,
          startAdornment: isPassword ? (showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />) : att.startAdornment,
          type: isPassword ? (showPassword ? "text" : "password") : att.type,
        };
      })
    );
  }, [showPassword]);

  const handleCheck = () => {
    setIsPwdRemember(!isPwdRemember);
  };

  const callApi = async () => {
    const response = await performRequest({
      endPoint: apiEndPoints?.login,
      method: method.post,
      data: { ...formData },
      showToastMessage: true,
      needLoader: true,
      parent: formPath.parent,
    });
    console.log('response', response)

  }

  const toggleVisibility = () => {
    setShowPassword(!showPassword)
  }

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
    callApi()
  }

  return {
    handleSubmit, loadingStatus, handleCheck, toggleVisibility, updatedAtt
  }
}

export default LoginContainer