import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";
import ModuleContainer from "../presentation/dashBoard/ModuleContainer";
import { ReactComponent as TotalQR } from "../assets/svg/dbAllQR.svg";
import { ReactComponent as ActiveQR } from "../assets/svg/dbActiveQR.svg";
import { ReactComponent as DisableQR } from "../assets/svg/dbDisableQR.svg";
import ChartContainer from "../presentation/dashBoard/ChartContainer";

interface DashboardContainerProps {
  formPath: any;
}

const DashboardContainer = ({ formPath }: DashboardContainerProps) => {
  const { parent, childObject } = formPath;
  const [topModule, setTopModule] = useState<any>([]);
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[parent],
  );
  const loadingStatusForCountList = useSelector(
    (state: any) => state.api?.loader?.[childObject],
  );
  const { performRequest } = ApiContainer();
  const qrCodesList = useSelector((state: any) => state?.api?.[parent]);
  const countListQrCode = useSelector(
    (state: any) => state?.api?.[parent]?.[childObject],
  );
  const dispatch: any = useDispatch();

  useEffect(() => {
    getAllQRs();
    getCountListQrCode();
  }, []);

  useEffect(() => {
    setTopModule([
      <ChartContainer
        key={1}
        activeQrs={countListQrCode?.[0]?.totalActiveqrcode}
        disableQrs={countListQrCode?.[0]?.totalDisbleqrcode}
        totalQrs={countListQrCode?.[0]?.totalQrcode}
      />,
      <ModuleContainer
        key={2}
        Indicator={TotalQR}
        title="totalQRCode"
        value={countListQrCode?.[0]?.totalQrcode || 0}
      />,
      <ModuleContainer
        key={3}
        Indicator={ActiveQR}
        title="totalActiveQR"
        value={countListQrCode?.[0]?.totalActiveqrcode || 0}
      />,
      <ModuleContainer
        key={4}
        Indicator={DisableQR}
        title="totalDisableQR"
        value={countListQrCode?.[0]?.totalDisbleqrcode || 0}
      />,
    ]);
  }, [loadingStatusForCountList, countListQrCode]);

  const getCountListQrCode = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.countList,
      method: method?.get,
      needLoader: true,
      parent: childObject,
    });
    if (res.status === 200) {
      dispatch(setCountData(res?.data));
    }
  };

  const setCountData = (data: any) => {
    return async (dispatch: any, getState: any) => {
      const prevData = getState()?.api?.[parent];
      dispatch({
        type: SET_API_DATA,
        payload: { [parent]: { ...prevData, [childObject]: data } },
      });
    };
  };

  const getAllQRs = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.getAllQRs,
      method: method?.get,
      needLoader: true,
      parent,
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
    countListQrCode,
    loadingStatusForCountList,
    topModule,
    getCountListQrCode,
  };
};

export default DashboardContainer;
