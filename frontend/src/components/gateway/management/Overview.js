import React from "react";
import {Card, CardActions, CardContent, Container, Grid, Typography} from "@mui/material";
import MapView from "./MapView";
import BasicTable from "../../../utils/DummyTable";

function GenInfo({title, value}) {
    return (
        <React.Fragment>
            <Grid item xs={5}>
                <Typography variant="subtitle2">{title}</Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="body2">{value}</Typography>
            </Grid>
        </React.Fragment>
    )
}

function Overview({gatewayInfo}) {
    return (
        <Grid container spacing={2} rowSpacing={3} sx={{pb: 1}}>
            <Grid item xs={5}>
                <Typography variant="h6" sx={{pb: 2}}>General Information</Typography>
                <Grid container spacing={2} rowSpacing={3} sx={{pb: 1}}>
                    <GenInfo title={'Gateway Name'} value={gatewayInfo.name}/>
                    <GenInfo title={'Gateway EUI'} value={gatewayInfo.eui}/>
                    <GenInfo title={'Created at'} value={(new Date(gatewayInfo.createdAt)).toLocaleString()}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Overview;