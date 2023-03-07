import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import {
    randomCreatedDate,
} from '@mui/x-data-grid-generator';
import {Link} from "react-router-dom";

const columns = [
    {field: 'id', headerName: 'ID', width: 240, editable: false},
    {
        field: 'name',
        headerName: 'Name',
        width: 300,
        editable: false,
    },
    {
        field: 'eui',
        headerName: 'Gateway EUI',
        width: 300,
        editable: false,
    },
    {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'date',
        width: 200,
        editable: false,
    },
    {
        field: 'link',
        headerName: 'Manage Gateway',
        width: 200,
        editable: false,
        renderCell: (params) => (
            <Link to={`/gateway/${params.value}`} style={{textDecoration: "none", color: "black"}}>Click here</Link>
        )
    },
];

const rows = [
    {
        id: "eui-1016c001f160f149",
        name: 'Waveshare SX1303 868M fyp-gch6-2',
        eui: '0016c001f160f149',
        dateCreated: randomCreatedDate(),
        link: '0016c001f160f149',
    },
    {
        id: "eui-0011c001f160f149",
        name: 'Waveshare SX1303 868M fyp-gch6-3',
        eui: '0016c001f160a149',
        dateCreated: randomCreatedDate(),
        link: '0016c001f160a149'
    },
    {
        id: "eui-0016c011f160f149",
        name: 'Waveshare SX1303 868M fyp-gch6-1',
        eui: '0016c001f16af149',
        dateCreated: randomCreatedDate(),
        link: '0016c001f160a149',
    },
    {
        id: "eui-0016c001f260f149",
        name: 'Waveshare SX1303 868M fyp-gch6-4',
        eui: '0016c0012a60f149',
        dateCreated: randomCreatedDate(),
        link: '0016c001f160a149'
    },
];

export default function GatewayGrid() {
    return (
        <React.Fragment>
            <Typography sx={{mb: 1}} color="text.dark" variant="h6">
                Registered Gateways
            </Typography>
            <Box sx={{height: '80vh', width: '1400px', bgcolor: "white"}}>
                <DataGrid
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