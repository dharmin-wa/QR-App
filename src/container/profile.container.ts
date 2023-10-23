/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";

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
  const userData = useSelector(
    (state: any) => state?.app?.["app-layout"]?.data,
  );

  return { userData };
};

export default ProfileContainer;
