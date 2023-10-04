import { ReactComponent as Dashboard } from ".././assets/svg/dashboard.svg";
import { ReactComponent as GenerateQR } from ".././assets/svg/generateQR.svg";
import { ReactComponent as AllQR } from ".././assets/svg/allQR.svg";
// import { ReactComponent as ActiveQR } from ".././assets/svg/activeQR.svg";
// import { ReactComponent as DisableQR } from ".././assets/svg/disableQR.svg";

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
      label: "All QR",
      redirectPath: "/all-qr",
      icon: AllQR,
    },
    /*  {
       label: "Active QR",
       redirectPath: "/active-qr",
       icon: ActiveQR,
     },
     {
       label: "Disable QR",
       redirectPath: "/disable-qr",
       icon: DisableQR,
     }, */
  ],
};
