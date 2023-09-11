import { useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { equal, keys } from "../utils/javascript";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordContainerProps {
  formData: any;
  validate: (name: string, value: any) => void;
  setError: any;
  formPath: any;
}

const ForgotPasswordContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: ForgotPasswordContainerProps) => {
  const { performRequest } = ApiContainer();
  const navigate = useNavigate();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  const apiCall = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.forgotPassword,
      method: method.post,
      data: { ...formData },
      showToastMessage: true,
      successToastMessage: "Mail sent successfully",
      needLoader: true,
      parent: formPath.parent,
    });
    if (equal(res?.status, 200)) {
      navigate("/verify-otp");
    }
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
    apiCall();
  };

  return { handleSubmit, loadingStatus };
};

export default ForgotPasswordContainer;
