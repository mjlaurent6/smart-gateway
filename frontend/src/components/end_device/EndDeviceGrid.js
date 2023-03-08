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

const columns = [
    {field: '_id', headerName: 'ID', width: 240, editable: false},
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
        editable: false,
    },
    {
        field: 'appEui',
        headerName: 'App EUI',
        width: 250,
        editable: false,
    },
    {
        field: 'devEui',
        headerName: 'Dev EUI',
        width: 250,
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'Date Created',
        width: 250,
        editable: false,
        renderCell: (params) => {
            const date = new Date(params.value).toLocaleString('en-HK', {timeZone: 'Asia/Hong_Kong'})
            return <div>{date}</div>
        }
    },
    {
        field: 'link',
        headerName: 'Manage End Device',
        width: 200,
        editable: false,
        renderCell: (params) => (
            <Link to={`/end_device/${params.row.devEui}`} style={{textDecoration: "none", color: "black"}}>Click
                here</Link>
        )
    },
];

// const rows = [
//     {
//         id: "eui-1016c001f160f149",
//         name: 'Waveshare SX1303 868M fyp-gch6-2',
//         eui: '0016c001f160f149',
//         dateCreated: randomCreatedDate(),
//         link: '0016c001f160f149',
//     },
//     {
//         id: "eui-0011c001f160f149",
//         name: 'Waveshare SX1303 868M fyp-gch6-3',
//         eui: '0016c001f160a149',
//         dateCreated: randomCreatedDate(),
//         link: '0016c001f160a149'
//     },
//     {
//         id: "eui-0016c011f160f149",
//         name: 'Waveshare SX1303 868M fyp-gch6-1',
//         eui: '0016c001f16af149',
//         dateCreated: randomCreatedDate(),
//         link: '0016c001f160a149',
//     },
//     {
//         id: "eui-0016c001f260f149",
//         name: 'Waveshare SX1303 868M fyp-gch6-4',
//         eui: '0016c0012a60f149',
//         dateCreated: randomCreatedDate(),
//         link: '0016c001f160a149'
//     },
// ];

export default function EndDeviceGrid() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch("/api/end_device")
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setRows(data.data))
    }, [])

    return (
        <React.Fragment>
            <Typography sx={{mb: 1}} color="text.dark" variant="h6">
                Registered End Device
            </Typography>
            <Box sx={{height: '80vh', width: '1450px', bgcolor: "white"}}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={rows}
                    columns={columns}
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
        </React.Fragment>

    );
}