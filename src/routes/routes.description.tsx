import { useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import MainLayout from "../presentation/layout/MainLayout";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import ForgotPassword from "../presentation/forgotPassword";
import NotFound from "../presentation/NotFound";
import SignUp from "../presentation/signup";
import OtpVerification from "../presentation/otpVerification";
import EmailVerification from "../presentation/emailVerification";
import DashBoard from "../presentation/dashBoard";
import AppLayout from "../presentation/layout/AppLayout";
import PasswordRecoverySuccess from "../presentation/PasswordRecoverySuccess";
import GenerateQR from "../presentation/generateQR";
import AllQR from "../presentation/allQR";
import { useSelector } from "react-redux";
import { loadStateFn } from "../utils/localStorage";
import ProtectedRoute from "../presentation/auth/ProtectedRoute";
import QRCodeDetails from "../presentation/QRCodeDetails";
import EditQRCode from "../presentation/QRCode/EditQRCode";
import Test from "../presentation/Test";

const RedirectComponent = () => {
  const { isAuthenticated } = useSelector((state: any) => state.app?.auth);
  const token = loadStateFn();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  return null;
};

const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <RedirectComponent />,
      },
      {
        path: "/login",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: "/signup",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/forgot-password",
        element: <AuthLayout />,
        children: [{ index: true, element: <ForgotPassword /> }],
      },
      {
        path: "/reset-password",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <OtpVerification />,
          },
        ],
      },
      /* {
        path: "/reset-password",
        element: <AuthLayout />,
        children: [{ index: true, element: <ResetPassword /> }],
      }, */
      {
        path: "/password-recovery-success",
        element: <PasswordRecoverySuccess />,
      },
    ],
  },
  {
    path: "/verify",
    element: <EmailVerification />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            children: [{ index: true, element: <DashBoard /> }],
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/generate-qr",
            children: [{ index: true, element: <GenerateQR /> }],
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/qr-codes",
            children: [{ index: true, element: <AllQR /> }],
          },
        ],
      },
      /*   {
          element: <AppLayout />,
          children: [
            {
              path: "/active-qr",
              children: [{ index: true, element: <ActiveQR /> }],
            },
          ],
        },
        {
          element: <AppLayout />,
          children: [
            {
              path: "/disable-qr",
              children: [{ index: true, element: <DisableQR /> }],
            },
          ],
        }, */
      {
        element: <AppLayout />,
        children: [
          {
            path: "/qr-codes/:qrCodeId",
            children: [{ index: true, element: <QRCodeDetails /> }],
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/edit-qr-code/:qrCodeId",
            children: [{ index: true, element: <EditQRCode /> }],
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/test",
            children: [{ index: true, element: <Test /> }],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
const routes = [...publicRoutes, ...privateRoutes];

export default routes;
