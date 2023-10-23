/* eslint-disable @typescript-eslint/no-unused-vars */
import { values } from "./../utils/javascript";
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
  const filterData = useSelector((state: any) => state.api?.[parent]?.filter);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getAllQRCodes();
  }, [page, rowsPerPage, filterData]);

  console.log("rowsPerPage", rowsPerPage);
  const { performRequest } = ApiContainer();
  const dispatch: any = useDispatch();
  console.log("filteData", filterData);

  const getAllQRCodes = async () => {
    const res: any = await performRequest({
      endPoint: `${apiEndPoints?.getAllQRs}?page=${page + 1
        }&size=${rowsPerPage}${values(filterData)?.length > 0 ? `&status=${checked ? "A" : "D"}` : ""
        }`,
      method: method?.get,
      needLoader: true,
      parent: formPath?.parent,
      responseSelector: true,
    });
    if (res.status === 200) {
      /* dispatch({
        type: SET_API_DATA,
        payload: { [parent]: { data: res?.data } },
      }); */
      dispatch(setApiData(res?.data));
    }
  };

  const setApiData = (data: any) => {
    return async (dispatch: any, getState: any) => {
      const prevData = getState()?.api?.[parent];
      console.log("getState", getState(), prevData);
      dispatch({
        type: SET_API_DATA,
        payload: { [parent]: { ...prevData, data } },
      });
    };
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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    dispatch({
      type: SET_API_DATA,
      payload: {
        [formPath?.parent]: {
          ...qrCodesList,
          filter: { [name]: checked },
        },
      },
    });
    setChecked(checked);
  };

  const handleRemoveFilter = (key: string, value: boolean) => {
    const data = Object.entries(filterData)?.filter(([k, v]) => {
      return k !== key;
    });

    console.log("data", { data, value }, Object.fromEntries(data));
    setChecked(!!Object.fromEntries(data)?.active);
    dispatch({
      type: SET_API_DATA,
      payload: {
        [formPath?.parent]: {
          ...qrCodesList,
          filter: Object.fromEntries(data),
        },
      },
    });
  };

  return {
    qrCodesList: qrCodesList?.data?.data,
    totalQrCodes: qrCodesList?.data?.total,
    loadingStatus,
    checked,
    handleFilterChange,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleRemoveFilter,
    filterData,
  };
};

export default AllQRContainer;
