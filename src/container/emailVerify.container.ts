import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiContainer } from "../utils/api";
import { useNavigate } from "react-router-dom";
// import { saveStateFn } from "../utils/localStorage";
import { apiEndPoints, method } from "../utils/constant";
import { equal } from "../utils/javascript";

interface EmailVerifyContainerProps {
  formPath: any;
}

const EmailVerifyContainer = ({ formPath }: EmailVerifyContainerProps) => {
  const { performRequest } = ApiContainer();
  const navigate = useNavigate();
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token: any = urlSearchParams.get("token");
    // saveStateFn("token", token);

    apiCall(token);
  }, []);

  const apiCall = async (token: string) => {
    const res: any = await performRequest({
      endPoint: `${apiEndPoints?.verifyEmail}?token=${token}`,
      method: method.get,
      showToastMessage: true,
      needLoader: true,
      parent: formPath.parent,
    });
    if (equal(res.status, 200)) {
      navigate("/login");
    }
  };

  return { apiCall, loadingStatus };
};

export default EmailVerifyContainer;
