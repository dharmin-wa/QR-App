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
    totalQrCodes,
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
      {qrCodesList?.length ? (
        <QRBox sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </QRBox>
      ) : null}
      {!loadingStatus ? (
        <>
          <QRFrame
            qrCodes={qrCodesList}
            formPath={formPath}
            responseSelector={true}
          />
          {qrCodesList?.length ? (
            <TablePagination
              component="div"
              count={totalQrCodes}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </>
      ) : (
        <QRFrameSkeleton numSkeletons={5} />
      )}
    </>
  );
};

export default AllQR;
