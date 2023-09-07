import { RouteObject } from "react-router-dom";
import MainLayout from "../presentation/layout/MainLayout";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import SignUp from "../presentation/signup";
import ForgotPassword from "../presentation/forgotPassword";

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
            element: <Login />
          }
        ]
      },
      {
        path: "/signup",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SignUp />
          }
        ]
      },
      {
        path: "/forgot-password",
        element: <AuthLayout />,
        children: [{ index: true, element: <ForgotPassword /> }],
      },
    ]
  }
]
const routes = [...publicRoutes]

export default routes;