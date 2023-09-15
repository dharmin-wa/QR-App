import React from "react";
import QRBox from "../shared/QRBox";
import ThumsUp from ".././assets/png/thumsUp.png";
import QRTypography from "../shared/QRTypography";
import { useTranslation } from "react-i18next";
import QRButton from "../shared/QRButton";
import { useNavigate } from "react-router-dom";

const PasswordRecoverySuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <QRBox
      width="388px"
      maxWidth="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      margin="auto"
      height="100vh"
      justifyContent="center"
    >
      <img
        src={ThumsUp}
        alt="Thank you"
        width={261}
        height={261}
        style={{
          objectFit: "contain",
        }}
      />
      <QRTypography variant="h4" fontWeight={700} textAlign="center" pt={2}>
        {t("passwordRecoverySuccess")}
      </QRTypography>
      <QRTypography fontWeight={400} textAlign="center" p={3}>
        {t("returnToLoginScreen")}
      </QRTypography>
      <QRButton
        variant="contained"
        sx={{ p: 2, m: 2, width: "321px", maxWidth: "100%" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        {t("returnToLogin")}
      </QRButton>
    </QRBox>
  );
};

export default PasswordRecoverySuccess;
