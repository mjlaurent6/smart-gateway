import React, {useState} from "react";
import {Card, Grid, Typography} from "@mui/material";
import MapView from "./MapView";
import LiveDataGrid from "./LiveDataGrid";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs/components/prism-core";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

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
                {selected && selected.message && selected.message.antenna_locations && <Grid item xs={7}>
                    <Card elevation={2}>
                        <MapView location={selected.message.antenna_locations[0]} size={0.7}/>
                    </Card>
                </Grid>}
                <Grid item xs={5}>
                    <Card elevation={2}>
                        {selected && Object.keys(selected).length != 0 && <Editor
                            value={JSON.stringify(selected, null, 2)}
                            highlight={selected => highlight(selected, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                            }}
                        />}
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card elevation={2}>
                        <LiveDataGrid messages={messages} setSelected={setSelected}/>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default HistoricalView;