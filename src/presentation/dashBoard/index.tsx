import React, { useState } from "react";
import { Grid, Paper, Modal } from "@mui/material";
import { formPath, topModule } from "../../description/dashboard.description";
import QRBox from "../../shared/QRBox";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";
import { ReactComponent as Timer } from "../../assets/svg/timer.svg";
import QRButton from "../../shared/QRButton";
import { ReactComponent as CreateQR } from "../../assets/svg/createQR.svg";
import CreateQRCode from "../QRCode/CreateQRCode";
import DashboardContainer from "../../container/dashboard.container";
import QRLoader from "../../shared/QRLoader";
import QRFrame from "../QRCode/QRFrame";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxWidth: "100%",
  maxHeight: "100vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto",
  p: 4,
};

const Dashboard = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { loadingStatus, qrCodesList } = DashboardContainer({ formPath });

  if (loadingStatus) {
    return <QRLoader variant="transParent" />;
  }

  return (
    <>
      <Grid container spacing={2}>
        {topModule?.map((v, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={0} sx={{ border: "1px solid #00000017" }}>
              {v}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <QRBox display="flex" justifyContent="space-between">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Timer fill="#366CBD" />
          <QRTypography fontWeight={500} fontSize={20}>
            {t("recentlyCreatedQRCodes")} (10)
          </QRTypography>
        </div>
        <QRButton
          startIcon={<CreateQR />}
          variant="contained"
          sx={{
            "&.MuiButton-root": {
              width: "fit-content !important",
              borderRadius: "6px",
              p: "1rem 1rem",
              fontSize: "1rem",
            },
          }}
          onClick={() => setOpen(true)}
        >
          {t("createQRCode")}
        </QRButton>
      </QRBox>
      {!loadingStatus && <QRFrame qrCodes={qrCodesList} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="create-qr-code"
        aria-describedby="create-qr-code"
      >
        <QRBox sx={style}>
          <CreateQRCode formPath={formPath} />
        </QRBox>
      </Modal>
    </>
  );
};

export default Dashboard;
