import React from "react";
import AllQRContainer from "../../container/allQR.container";
import { formPath } from "../../description/allQR.description";
import QRFrame from "../QRCode/QRFrame";
import QRFrameSkeleton from "../QRCode/QRFrameSkeleton";
import { Switch, TablePagination } from "@mui/material";
import QRBox from "../../shared/QRBox";

const AllQR = () => {
  const {
    qrCodesList,
    loadingStatus,
    checked,
    handleChange,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
  } = AllQRContainer({
    formPath,
  });

  return (
    <>
      <QRBox sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </QRBox>
      {!loadingStatus ? (
        <>
          <QRFrame qrCodes={qrCodesList} formPath={formPath} />
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <QRFrameSkeleton numSkeletons={5} />
      )}
    </>
  );
};

export default AllQR;
