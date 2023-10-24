import React from "react";
import { Container } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import moment from "moment";

import QRCodeDetailsContainer from "../../container/qrCodeDetails.container";
import { formPath } from "../../description/qrCodeDetails.description";
import QRLoader from "../../shared/QRLoader";
import { useNavigate } from "react-router-dom";
import QRTypography from "../../shared/QRTypography";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";

interface QRCodeDetailsData {
  qr_type: string;
  data: {
    link?: string;
    free_text?: string;
    action?: Array<{
      url: string;
      action_name: string;
    }>;
  };
  created_at?: string;
  updated_at?: string;
  _id?: string;
}

const QRCodeDetails: React.FC = () => {
  const { qrCode, loadingStatus } = QRCodeDetailsContainer({ formPath });
  const navigate = useNavigate();

  const renderQRCode = (data: QRCodeDetailsData | null) => {
    if (!data) return null;

    const renderQrType = () => {
      switch (data.qr_type) {
        case "Link":
          return (
            <div>
              <QRCode value={data.data.link} />
              <QRTypography variant="body1">
                <strong>Link:</strong> {data.data.link}
              </QRTypography>
            </div>
          );

        case "Email":
          return (
            <div>
              <QRCode value={`mailto:${data.data.free_text}`} />
              <QRTypography variant="body1">
                <strong>Email:</strong> {data.data.free_text}
              </QRTypography>
            </div>
          );

        case "PhoneNumber":
          return (
            <div>
              <QRCode value={data.data.free_text} />
              <QRTypography variant="body1">
                <strong>Phone number:</strong> {data.data.free_text}
              </QRTypography>
            </div>
          );

        case "MultiAction":
          return (
            <div>
              {data?.data?.action?.map((action, index) => (
                <div key={index}>
                  <QRCode value={action.url} />
                  <QRTypography variant="body1">
                    <strong>Action Name:</strong> {action.action_name}
                  </QRTypography>
                </div>
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div>
        {renderQrType()}
        <QRTypography variant="body1" style={{ fontSize: "18px" }}>
          <strong>QR Type:</strong> {data.qr_type}
        </QRTypography>
        <QRTypography variant="body1">
          <strong>Created At:</strong>
          {moment(data?.created_at).format("MMM D, YYYY")}
        </QRTypography>
        <QRTypography variant="body1">
          <strong>Updated At:</strong>
          {moment(data?.updated_at).format("MMM D, YYYY")}
        </QRTypography>
        <QRBox mt={3} display="flex" justifyContent="center" gap={2}>
          <QRButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              navigate(`/edit-qr-code/${data?._id}`);
            }}
          >
            Edit
          </QRButton>
          {/*  <QRButton
            variant="contained"
            color="error"
            size="large"
            onClick={handleDeleteClick}
          >
            Delete
          </QRButton> */}
        </QRBox>
      </div>
    );
  };

  /*  const handleDeleteClick = () => {
     // Handle delete QRbuttonQRButton click here
   }; */

  return (
    <Container maxWidth="md">
      <QRBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        p={2}
      >
        {loadingStatus ? <QRLoader variant="fullPage" /> : renderQRCode(qrCode)}
      </QRBox>
    </Container>
  );
};

export default QRCodeDetails;
