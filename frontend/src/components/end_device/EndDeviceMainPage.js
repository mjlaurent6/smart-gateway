import React from "react";
import {Container} from "@mui/material";
import EndDeviceGrid from "./EndDeviceGrid";

function EndDeviceMainPage() {
    return (<Container sx={{minWidth: 1500, margin: "auto", overflow: "hidden"}}>
        <EndDeviceGrid/>
    </Container>)
}

export default EndDeviceMainPage;