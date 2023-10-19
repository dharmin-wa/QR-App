import { useEffect } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_APP_DATA } from "../redux/constants";

interface AppLayoutContainerProps {
  formPath: any;
}

const AppLayoutContainer = ({ formPath }: AppLayoutContainerProps) => {
  const { parent } = formPath;
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state?.app?.[parent]?.data);

  useEffect(() => {
    getUserProfileData();
  }, []);

  const getUserProfileData = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.userData,
      method: method?.get,
      needLoader: true,
      parent,
    });
    if (res.status === 200) {
      dispatch({
        type: SET_APP_DATA,
        payload: { [parent]: { data: res?.data } },
      });
    }
  };

  return {
    userData,
  };
};

export default AppLayoutContainer;
