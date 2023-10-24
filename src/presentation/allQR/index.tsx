/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import AllQRContainer from "../../container/allQR.container";
import { formPath } from "../../description/allQR.description";
import QRFrame from "../QRCode/QRFrame";
import QRFrameSkeleton from "../QRCode/QRFrameSkeleton";
import { Chip, Switch, TablePagination, Tooltip } from "@mui/material";
import QRBox from "../../shared/QRBox";
import { capitalizedString, values } from "../../utils/javascript";

const AllQR = () => {
  const {
    qrCodesList,
    totalQrCodes,
    loadingStatus,
    checked,
    handleFilterChange,
    page,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleRemoveFilter,
    filterData = {},
  } = AllQRContainer({
    formPath,
  });

  return (
    <>
      <QRBox sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <QRBox>
          {Object.entries(filterData)?.map(([k, v]: any, index: number) => {
            return (
              <Chip
                key={index}
                label={capitalizedString(k) || ""}
                variant="outlined"
                color="primary"
                onDelete={() => handleRemoveFilter(k, v)}
              />
            );
          })}
        </QRBox>
        {qrCodesList?.length ||
        (!qrCodesList?.length && values(filterData).length) ? (
          <Tooltip title={checked ? "Active" : "Disabled"} placement="top">
            <Switch
              name={!checked ? "active" : "disabled"}
              checked={checked}
              onChange={handleFilterChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Tooltip>
        ) : null}
      </QRBox>
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
