import React from "react";
import QRCodeDetailsContainer from "../../container/qrCodeDetails.container";
import { formPath } from "../../description/qrCodeDetails.description";
// import QRBox from "../../shared/QRBox";
import { Typography, Container, Box, CircularProgress } from "@mui/material";
import { QRCode } from "react-qrcode-logo";

const QRCodeDetails = () => {
  const { qrCode, loadingStatus } = QRCodeDetailsContainer({ formPath });

  const renderQRCode = (data: any) => {
    if (!data) return null;

    return (
      <div>
        {data.qr_type === "link" && (
          <div>
            <QRCode value={data.data.link} />
            <Typography variant="body1">QR Type: {data.qr_type}</Typography>
            <Typography variant="body1">Link: {data.data.link}</Typography>
          </div>
        )}

        {(data.qr_type === "email" || data.qr_type === "normal") && (
          <div>
            <QRCode value={`mailto:${data.data.free_text}`} />
            <Typography variant="body1">QR Type: {data.qr_type}</Typography>
            <Typography variant="body1">
              Email: {data.data.free_text}
            </Typography>
          </div>
        )}

        {data.qr_type === "multiaction" && (
          <div>
            {data.data.action.map((action: any, index: number) => (
              <div key={index}>
                <QRCode value={action.url} />
                <Typography variant="body1">QR Type: {data.qr_type}</Typography>
                <Typography variant="body1">
                  Action Name: {action.action_name}
                </Typography>
              </div>
            ))}
          </div>
        )}

        <Typography variant="body1">Created At: {data.created_at}</Typography>
        <Typography variant="body1">Updated At: {data.updated_at}</Typography>
      </div>
    );
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh" // Adjust the height as needed
        p={2}
      >
        {loadingStatus ? <CircularProgress /> : renderQRCode(qrCode)}
      </Box>
    </Container>
  );
};

export default QRCodeDetails;
