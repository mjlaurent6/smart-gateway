import React, {useState} from "react";
import {Card, Grid, Typography} from "@mui/material";
import MapView from "./MapView";
import LiveDataGrid from "./LiveDataGrid";

const messages = [
    {
        "time": "2023-02-05T10:34:12Z",
        "message": {
            "time": "2023-02-05T10:34:12Z",
            "identifiers": [
                {
                    "gateway_ids": {
                        "gateway_id": "eui-0016c001f160f1b2",
                        "eui": "0016C001F160F1B2"
                    }
                }
            ],
            "antenna_locations": [
                {
                    "latitude": 22.30949,
                    "longitude": 114.25795,
                    "altitude": 10,
                    "source": "SOURCE_GPS"
                }
            ],
            "metrics": {
                "ackr": 0,
                "txin": 0,
                "txok": 0,
                "temp": 37.4,
                "rxin": 0,
                "rxok": 0,
                "rxfw": 0,
                "batt": 99
            }
        }
    },
    {
        "time": "2023-02-05T10:34:11Z",
        "message": {
            "time": "2023-02-05T10:34:11Z",
            "identifiers": [
                {
                    "gateway_ids": {
                        "gateway_id": "eui-0016c001f160f1b2",
                        "eui": "0016C001F160F1B2"
                    }
                }
            ],
            "antenna_locations": [
                {
                    "latitude": 22.30949,
                    "longitude": 114.25895,
                    "altitude": 10,
                    "source": "SOURCE_GPS"
                }
            ],
            "metrics": {
                "ackr": 0,
                "txin": 0,
                "txok": 0,
                "temp": 37.4,
                "rxin": 0,
                "rxok": 0,
                "rxfw": 0,
                "batt": 99
            }
        }
    }
]

function HistoricalView() {
    const [selected, setSelected] = useState({});
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{pb: 1}}>
                <Grid item xs={6}>
                    <Card elevation={2}>
                        <LiveDataGrid messages={messages} setSelected={setSelected}/>
                    </Card>
                </Grid>
                {selected && selected.message && selected.message.antenna_locations && <Grid item xs={6}>
                    <Card elevation={2}>
                        <MapView location={selected.message.antenna_locations[0]} size={0.5}/>
                    </Card>
                </Grid>}
                <Grid item xs={12}>
                    <Card elevation={2}>
                        <pre>{JSON.stringify(selected, null, 2)}</pre>
                    </Card>
                </Grid>

            </Grid>
        </React.Fragment>
    )
}

export default HistoricalView;