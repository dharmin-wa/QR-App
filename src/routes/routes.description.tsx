import { RouteObject } from "react-router-dom";
import MainLayout from "../presentation/layout/MainLayout";
import AuthLayout from "../presentation/layout/AuthLayout";
import Login from "../presentation/login";
import SignUp from "../presentation/signup";

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
      }
    ]
  }
]
const routes = [...publicRoutes]

export default routes;