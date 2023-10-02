import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useSelector } from "react-redux";

interface DashboardContainerProps {
  formPath: any;
}

const DashboardContainer = ({ formPath }: DashboardContainerProps) => {
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );
  const { performRequest } = ApiContainer();
  const [qrCodesList, setQrCodesList] = useState([]);

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
      setQrCodesList(res?.data);
    }
    console.log("res", res);
  };

  return {
    loadingStatus,
    qrCodesList,
  };
};

export default DashboardContainer;
