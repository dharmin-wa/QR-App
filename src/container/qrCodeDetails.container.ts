import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";

interface QRCodeDetailsContainerProps {
  formPath: any;
}

const QRCodeDetailsContainer = ({ formPath }: QRCodeDetailsContainerProps) => {
  const { qrCodeId } = useParams();
  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();
  const qrCode = useSelector((state: any) => state?.api?.[formPath?.parent]);
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.parent],
  );

  useEffect(() => {
    if (qrCodeId) {
      getQRCode(qrCodeId);
    }
  }, []);

  const getQRCode = async (qrCodeId: string) => {
    const res: any = await performRequest({
      endPoint: `${apiEndPoints?.viewQR}/${qrCodeId}`,
      method: method.get,
      showToastMessage: false,
      needLoader: true,
      parent: formPath.parent,
      responseSelector: true,
    });

    if (res.status === 200) {
      dispatch({
        type: SET_API_DATA,
        payload: { [formPath?.parent]: res?.data },
      });
    }
  };

  return { qrCode, loadingStatus };
};

export default QRCodeDetailsContainer;
