import { useEffect, useState } from "react";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";

interface AllQRContainerProps {
  formPath: any;
}

const AllQRContainer = ({ formPath }: AllQRContainerProps) => {
  const { parent } = formPath;
  const qrCodesList = useSelector((state: any) => state?.api?.[parent]);
  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[parent],
  );
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    getAllQRCodes();
  }, []);

  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();

  const getAllQRCodes = async () => {
    const res: any = await performRequest({
      endPoint: apiEndPoints?.getAllQRs,
      method: method?.get,
      needLoader: true,
      parent: formPath?.parent,
    });
    if (res.status === 200) {
      dispatch({ type: SET_API_DATA, payload: { [parent]: res?.data } });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return {
    qrCodesList,
    loadingStatus,
    checked,
    handleChange,
  };
};

export default AllQRContainer;
