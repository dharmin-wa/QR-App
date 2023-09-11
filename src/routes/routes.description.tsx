import { RouteObject } from "react-router-dom";
import MainLayout from "../presentation/layout/MainLayout";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import ForgotPassword from "../presentation/forgotPassword";
import NotFound from "../presentation/NotFound";
import SignUp from "../presentation/signup";
import OtpVerification from "../presentation/otpVerification";

const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
const routes = [...publicRoutes];

export default routes;
