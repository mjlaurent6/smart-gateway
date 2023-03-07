import {Card, CardContent, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import MapView from "./MapView";
import GatewayGrid from "./GatewayGrid";
import LiveDataGrid from "./LiveDataGrid";
import StatusCard from "./StatusCard";

function Status({payload, setConnectionStatus}) {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        console.log(`initializing interval`);
        const interval = setInterval(() => {
            setConnectionStatus(false);
        }, 40000);

        return () => {
            console.log(`clearing interval`);
            clearInterval(interval);
        };
    }, [payload]);
    useEffect(() => {
        if (payload.topic) {
            setMessages([...messages, JSON.parse(payload.message)]);
        }
    }, [payload])
    const {
        message
    } = messages.at(messages.length - 1) || {};
    const {
        antenna_locations, metrics, time
    } = message || {};
    const {
        temp, batt
    } = metrics || {};
    console.log(messages)
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
            {message && <React.Fragment>
                <Grid item xs={7}>
                    <Card elevation={2}>
                        <LiveDataGrid messages={messages} setSelected={setSelected}/>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card elevation={2}>
                        <pre>{JSON.stringify(selected, null, 2)}</pre>
                    </Card>
                </Grid>
            </React.Fragment>}

        </Grid>
    </React.Fragment>);
}

export default Status;
