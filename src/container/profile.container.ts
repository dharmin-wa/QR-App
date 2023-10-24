/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { keys } from "../utils/javascript";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import AppLayoutContainer from "./appLayout.container";

interface ProfileContainerProps {
  formData: any;
  validate: (name: string, value: any) => void;
  setError: any;
  formPath: any;
}

const ProfileContainer = ({
  formData,
  validate,
  setError,
  formPath,
}: ProfileContainerProps) => {
  const { parent } = formPath;
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[parent],
  );
  const { performRequest } = ApiContainer();
  const { userData } = AppLayoutContainer({ formPath });
  console.log("formData", formData);
  const callApi = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.updateProfile,
      method: method.put,
      data: { ...formData },
      showToastMessage: true,
      showErrorToastMessage: true,
      successToastMessage: "Update successful!",
      needLoader: true,
      parent,
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
    // callApi();
  };

  return { userData, handleSubmit, loadingStatus };
};

export default ProfileContainer;
