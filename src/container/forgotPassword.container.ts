import { useSelector, } from "react-redux";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { keys } from "../utils/javascript";

interface ForgotPasswordContainerProps {
  formData: any
  validate: (name: string, value: any) => void
  setError: any
  formPath: any
}

const ForgotPasswordContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: ForgotPasswordContainerProps) => {
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  const apiCall = async () => {
    performRequest({
      endPoint: apiEndPoints?.forgotPassword,
      method: method.post,
      data: { ...formData },
      showToastMessage: true,
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
    apiCall();
  };

  return { handleSubmit, loadingStatus };
};

export default ForgotPasswordContainer;
