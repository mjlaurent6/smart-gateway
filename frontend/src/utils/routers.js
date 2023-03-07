import {createBrowserRouter} from "react-router-dom";
import Content from "../components/gateway/contents/Content";
import RealtimeMonitoring from "../components/gateway/management/RealtimeMonitoring";
import Status from "../components/gateway/management/Status";
import {AddGateway} from "../components/gateway/register";
import Paperbase from "../components/Paperbase";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import GatewayMainPage from "../components/gateway/GatewayMainPage";
import Dashboard from "../components/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    },
    {
        path: "/dashboard",
        element: <Paperbase/>,
        children: [
            {
                path: "",
                element: <Dashboard/>,
            },
        ],
    },
    {
        path: "/gateway",
        element: <Paperbase/>,
        children: [
            {
                path: "",
                element: <GatewayMainPage/>,
            },
            {
                path: "register",
                element: <AddGateway/>,
            },
            {
                path: ":eui",
                element: <RealtimeMonitoring/>,
            },
        ],
    },
]);

export default router;
