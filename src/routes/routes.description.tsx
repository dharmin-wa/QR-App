import { useEffect } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import MainLayout from "../presentation/layout/MainLayout";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import ForgotPassword from "../presentation/forgotPassword";
import NotFound from "../presentation/NotFound";
import SignUp from "../presentation/signup";
import OtpVerification from "../presentation/otpVerification";
import ResetPassword from "../presentation/resetPassword";
import EmailVerification from "../presentation/emailVerification";
import DashBoard from "../presentation/dashBoard";
import ProtectedRoute from "../presentation/layout/ProtectedRoute";

const RedirectComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
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
        path: "/verify-otp",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <OtpVerification />,
          },
        ],
      },
      {
        path: "/reset-password",
        element: <AuthLayout />,
        children: [{ index: true, element: <ResetPassword /> }],
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
        path: "/dashboard",
        children: [{ index: true, element: <DashBoard /> }],
      },
    ],
  },
];
const routes = [...publicRoutes, ...privateRoutes];

export default routes;
