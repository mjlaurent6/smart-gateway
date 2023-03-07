import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import {
    randomCreatedDate,
} from '@mui/x-data-grid-generator';

const columns = [
    {field: 'id', headerName: 'ID', width: 240},
    {
        field: 'firstName',
        headerName: 'Name',
        width: 300,
        editable: false,
    },
    {
        field: 'lastName',
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
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', dateCreated: randomCreatedDate()},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', dateCreated: randomCreatedDate()},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', dateCreated: randomCreatedDate()},
    {id: 4, lastName: 'Stark', firstName: 'Arya', dateCreated: randomCreatedDate()},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', dateCreated: randomCreatedDate()},
    {id: 6, lastName: 'Melisandre', firstName: null, dateCreated: randomCreatedDate()},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', dateCreated: randomCreatedDate()},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', dateCreated: randomCreatedDate()},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', dateCreated: randomCreatedDate()},
];

export default function GatewayGrid() {
    return (
        <React.Fragment>
            <Typography sx={{mb: 1}} color="text.dark" variant="h6">
                Registered Gateways
            </Typography>
            <Box sx={{height: '80vh', width: '1200px', bgcolor: "white"}}>
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
                />
            </Box>
        </React.Fragment>

    );
}