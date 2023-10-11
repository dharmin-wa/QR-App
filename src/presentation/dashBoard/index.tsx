import { Grid, Paper } from "@mui/material";
import { formPath, topModule } from "../../description/dashboard.description";
import QRBox from "../../shared/QRBox";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";
import { ReactComponent as Timer } from "../../assets/svg/timer.svg";
import QRButton from "../../shared/QRButton";
import { ReactComponent as CreateQR } from "../../assets/svg/createQR.svg";
import DashboardContainer from "../../container/dashboard.container";
import QRFrame from "../QRCode/QRFrame";
import QRFrameSkeleton from "../QRCode/QRFrameSkeleton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { t } = useTranslation();
  const { loadingStatus, qrCodesList } = DashboardContainer({ formPath });
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={2} flexGrow={1}>
        {topModule?.map((v, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Paper
              elevation={0}
              sx={{ boxShadow: "0px 0px 4px 0px #00000040" }}
            >
              {v}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <QRBox display="flex" justifyContent="space-between" p="16px 0">
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Timer fill="#366CBD" />
          <QRTypography
            fontWeight={600}
            color="#1B294B"
            fontSize={"1rem"}
            sx={{
              // lineHeight: '24px',
              letterSpacing: "0.01em",
            }}
          >
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
              fontSize: "1rem",
            },
          }}
          onClick={() => navigate("/generate-qr")}
        >
          {t("createQRCode")}
        </QRButton>
      </QRBox>

      {!loadingStatus ? (
        <QRFrame qrCodes={qrCodesList} formPath={formPath} />
      ) : (
        <QRFrameSkeleton numSkeletons={3} />
      )}
    </>
  );
};

export default Dashboard;
