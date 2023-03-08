import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {Card, Grid, TextField} from "@mui/material";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs/components/prism-core";
import {Link} from "react-router-dom";

const columns = [
    {
        field: 'time',
        headerName: 'Date Created',
        width: 200,
        editable: false,
        renderCell: (params) => {
            const date = new Date(params.value).toLocaleString('en-HK', {timeZone: 'Asia/Hong_Kong'})
            return <div>{date}</div>
        }
    },
    {
        field: 'message',
        headerName: 'Message',
        width: 1300,
        editable: false,
        renderCell: (params) => {
            const obj = JSON.stringify(params.value, null, 2);
            return <div>{obj}</div>
        }
    }
];

const rows = [
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
                    "batt": 91
                }
            }
        }
    ]
;


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

function LiveDataGrid({setSelected, messages}) {
    // const [rows, setRows] = useState([]);
    return (
        <Box sx={{height: '596px', width: '100%', bgcolor: "white"}}>
            <DataGrid
                getRowId={(row) => row.time}
                getRowHeight={() => 'auto'}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                onRowClick={params => setSelected(params.row)}
                pageSizeOptions={[8]}
                slots={{toolbar: GridToolbar}}
            />
        </Box>
    );
}


const listenedGateway = [
    {"time": "2023-02-05T10:34:12Z", "gatewayEUI": "0016C001F160F1B2", "rssi": -90},
    {"time": "2023-02-05T10:34:13Z", "gatewayEUI": "0016C001F160F1B2", "rssi": -50},
    {"time": "2023-02-05T10:34:14Z", "gatewayEUI": "0016C001F160F1B2", "rssi": -100},
    {"time": "2023-02-05T10:34:15Z", "gatewayEUI": "0016C001F160F1B2", "rssi": -70},
    {"time": "2023-02-05T10:34:16Z", "gatewayEUI": "0016C001F160F1B2", "rssi": -80},
]

const listenedColumns = [
    {
        field: 'time',
        headerName: 'Date Created',
        width: 200,
        editable: false,
        renderCell: (params) => {
            const date = new Date(params.value).toLocaleString('en-HK', {timeZone: 'Asia/Hong_Kong'})
            return <div>{date}</div>
        }
    },
    {
        field: 'gatewayEUI',
        headerName: 'Gateway EUI',
        width: 400,
        editable: false,
        renderCell: (params) => (
            <Link to={`/gateway/${params.row.gatewayEUI}`}
                  style={{textDecoration: "none", color: "black"}}>{params.row.gatewayEUI}</Link>
        )
    },
    {
        field: 'rssi',
        headerName: 'RSSI',
        type: 'number',
        width: 300,
        editable: false,
    }
];

function ListenedGrid({messages}) {
    // const [rows, setRows] = useState([]);
    return (
        <Box sx={{height: '500px', width: '100%', bgcolor: "white"}}>
            <DataGrid
                getRowId={(row) => row.time}
                getRowHeight={() => 'auto'}
                rows={listenedGateway}
                columns={listenedColumns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                }}
                pageSizeOptions={[8]}
                slots={{toolbar: GridToolbar}}
            />
        </Box>
    );
}


export default function LiveDataView() {
    const [selected, setSelected] = useState({});
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{pb: 1}}>
                <Grid item xs={8}>
                    <Card elevation={2}>
                        <LiveDataGrid messages={messages} setSelected={setSelected}/>
                    </Card>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={8}>
                    <Card elevation={2}>
                        <ListenedGrid messages={listenedGateway}/>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}