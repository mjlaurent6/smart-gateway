import {Card, CardContent, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import MapView from "./MapView";

function StatusCard({item, value}) {
    return (<Card elevation={2}>
        <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                {item}
            </Typography>
            <Typography variant="h5" color="green">
                {value}
            </Typography>
        </CardContent>
    </Card>);
}

function OnlineStatus({status}) {

    return (<div style={{display: "flex"}}>
        <svg height="20" width="20">
            <circle fill={status.color} stroke="none" cx="10" cy="10" r="10">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite"
                         begin="0.1"/>
            </circle>
        </svg>
        <Typography sx={{pl: 1}} variant={"body2"}>{status.text}</Typography>
    </div>);
}

function Status({payload, setConnectionStatus}) {
    const [messages, setMessages] = useState();
    useEffect(() => {
        console.log(`initializing interval`);
        const interval = setInterval(() => {
            setMessages();
            setConnectionStatus(false);
        }, 3000);

        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };
    }, [payload]);
    useEffect(() => {
        if (payload.topic) {
            setMessages(JSON.parse(payload.message));
        }
    }, [payload])
    const {
        antenna_locations, metrics, time
    } = messages || {};
    const {
        temp, batt
    } = metrics || {};

    return (<React.Fragment>
        <Grid container spacing={2} sx={{pb: 1}}>
            {!time && <Grid item xs={3}><Typography>Realtime data not available</Typography></Grid>}
            {time && <Grid item xs={3}>
                <StatusCard
                    item={"Last Updated"}
                    value={new Date(time).toLocaleString('en-HK', {timeZone: 'Asia/Hong_Kong'})}
                />
            </Grid>}
            {temp && <Grid item xs={3}><StatusCard item={"Temperature (°C)"} value={temp}/></Grid>}
            {batt && <Grid item xs={6}><StatusCard item={"Battery (%)"} value={batt}/></Grid>}
            {antenna_locations && <Grid item xs={12}>
                <Card elevation={2}>
                    <MapView location={antenna_locations[0]}/>
                </Card>
            </Grid>}
        </Grid>
    </React.Fragment>);
}

export default Status;
