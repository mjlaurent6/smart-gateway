import React from "react";
import {Container} from "@mui/material";
import GatewayGrid from "./management/GatewayGrid";

function GatewayMainPage() {
    return (<Container sx={{minWidth: 1500, margin: "auto", overflow: "hidden"}}>
        <GatewayGrid/>
    </Container>)
}

export default GatewayMainPage;