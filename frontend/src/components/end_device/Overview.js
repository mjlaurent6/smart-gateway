import React from "react";
import {Card, CardActions, CardContent, Container, Grid, Typography} from "@mui/material";

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

function Overview({endDeviceInfo}) {
    return (
        <Grid container spacing={2} rowSpacing={3} sx={{pb: 1}}>
            <Grid item xs={5}>
                <Typography variant="h6" sx={{pb: 2}}>General Information</Typography>
                <Grid container spacing={2} rowSpacing={3} sx={{pb: 1}}>
                    <GenInfo title={'End Device Name'} value={endDeviceInfo.name}/>
                    <GenInfo title={'End Device Dev EUI'} value={endDeviceInfo.devEui}/>
                    <GenInfo title={'End Device App EUI'} value={endDeviceInfo.appEui}/>
                    <GenInfo title={'Created at'} value={(new Date(endDeviceInfo.createdAt)).toLocaleString()}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Overview;