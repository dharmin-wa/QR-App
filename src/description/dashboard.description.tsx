import Dashboard from ".././assets/svg/dashboard.svg";
import GenerateQR from ".././assets/svg/generateQR.svg";
import AllQR from ".././assets/svg/allQR.svg";
import ActiveQR from ".././assets/svg/activeQR.svg";
import DisableQR from ".././assets/svg/disableQR.svg";

export const sidebarAtt = {
  dashboardOverView: [
    {
      label: "Dashboard",
      redirectPath: "/dashboard",
      icon: Dashboard,
    },
  ],
  qrCode: [
    {
      label: "Generate QR",
      redirectPath: "/generate-qr",
      icon: GenerateQR,
    },
    {
      label: "Generate QR",
      redirectPath: "/generate-qr",
      icon: AllQR,
    },
    {
      label: "Generate QR",
      redirectPath: "/generate-qr",
      icon: ActiveQR,
    },
    {
      label: "Generate QR",
      redirectPath: "/generate-qr",
      icon: DisableQR,
    },
  ],
};
