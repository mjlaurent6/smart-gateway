import { createBrowserRouter } from "react-router-dom";
import Content from "../components/gateway/contents/Content";
import Management from "../components/gateway/management/Management";
import Status from "../components/gateway/management/Status";
import { AddGateway } from "../components/gateway/register";
import Paperbase from "../components/Paperbase";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Paperbase />,
    children: [
      {
        path: "gateway",
        element: <Management />,
        children: [
          {
            path: "management",
            element: <Status />,
          },
        ],
      },
    ],
  },
  {
    path: "/gateway",
    element: <Paperbase />,
    children: [
      {
        path: "management",
        element: <Management />,
      },
      {
        path: "add-gateway",
        element: <AddGateway />,
      },
    ],
  },
]);

export default router;
