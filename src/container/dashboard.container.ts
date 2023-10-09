import { useEffect } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";

interface DashboardContainerProps {
  formPath: any;
}

const DashboardContainer = ({ formPath }: DashboardContainerProps) => {
  const { parent } = formPath;
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );
  const { performRequest } = ApiContainer();
  const qrCodesList = useSelector((state: any) => state?.api?.[parent]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllQRs();
  }, []);

  const getAllQRs = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.getAllQRs,
      method: method?.get,
      needLoader: true,
      parent: formPath?.parent,
    });
    if (res.status === 200) {
      dispatch({
        type: SET_API_DATA,
        payload: { [parent]: { data: res?.data } },
      });
    }
  };

  return {
    loadingStatus,
    qrCodesList: qrCodesList?.data,
  };
};

export default DashboardContainer;
