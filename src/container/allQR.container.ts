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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllQRCodes();
  }, [page, rowsPerPage]);

  const { performRequest } = ApiContainer();
  const dispatch = useDispatch();

  const getAllQRCodes = async () => {
    const res: any = await performRequest({
      endPoint: `${apiEndPoints?.getAllQRs}?page=${
        page + 1
      }&size=${rowsPerPage}`,
      method: method?.get,
      needLoader: true,
      parent: formPath?.parent,
    });
    if (res.status === 200) {
      dispatch({ type: SET_API_DATA, payload: { [parent]: res?.data } });
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return {
    qrCodesList,
    loadingStatus,
    checked,
    handleChange,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  };
};

export default AllQRContainer;
