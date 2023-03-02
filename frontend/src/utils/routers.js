import { createBrowserRouter } from "react-router-dom";
import Content from "../components/contents/Content";
import Control from "../components/contents/Control";
import Status from "../components/contents/controls/Status";
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
        element: <Control />,
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
        element: <Control />,
      },
    ],
  },
]);

export default router;
