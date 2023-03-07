import {Card, CardContent, Typography} from "@mui/material";
import React from "react";

export default function StatusCard({item, value}) {
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