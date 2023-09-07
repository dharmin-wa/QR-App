import { useEffect, useState } from "react";
import { equal, keys } from '../utils/javascript';
import { ApiContainer } from '../utils/api';
import { apiEndPoints, method } from '../utils/constant';
import { useSelector } from 'react-redux';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface SignUpContainerProps {
  formData: any
  validate: (name: string, value: any) => void
  setError: any
  formPath: any
  attribute: any
}

const SignUpContainer = ({ formData, validate, setError, formPath, attribute }: SignUpContainerProps) => {
  const [agreeTC, setAgreeTC] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [updatedAtt, setUpdatedAtt] = useState<Array<any>>(attribute)
  const [strength, setStrength] = useState(0);

  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );
  console.log('formData', formData)

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

  useEffect(() => {
    calculateStrength(formData?.password);
  }, [formData?.password])

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
  }


  const handleCheck = () => {
    setAgreeTC(!agreeTC);
  };

  const toggleVisibility = () => {
    setShowPassword(!showPassword)
  }

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
    handleSubmit, loadingStatus, handleCheck, toggleVisibility, updatedAtt, strength
  }
}

export default SignUpContainer