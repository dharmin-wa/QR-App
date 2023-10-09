/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import QRForm from "./QRForm";
import QRCodeDetailsContainer from "../../container/qrCodeDetails.container";
import { formPath } from "../../description/editQR.description";
import QRLoader from "../../shared/QRLoader";

const EditQRCode = () => {
  const { qrCode, loadingStatus } = QRCodeDetailsContainer({ formPath });
  if (loadingStatus) {
    return <QRLoader variant="fullPage" />;
  }
  return <QRForm headTitle="editQRCode" qrCode={qrCode} editQR={true} />;
};

export default EditQRCode;
