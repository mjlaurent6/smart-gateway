import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import {
    randomCreatedDate,
} from '@mui/x-data-grid-generator';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {TextField} from "@mui/material";

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
    },
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

export default function LiveDataGrid({setSelected, messages}) {
    // const [rows, setRows] = useState([]);
    return (
        <Box sx={{height: '40vh', width: '100%', bgcolor: "white"}}>
            <DataGrid
                getRowId={(row) => row.time}
                getRowHeight={() => 'auto'}
                rows={messages}
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