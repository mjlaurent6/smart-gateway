import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

function StatusCard() {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Battery
        </Typography>
        <Typography variant="h4" color="green">
          80 %
        </Typography>
      </CardContent>
    </Card>
  );
}

function Status() {
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ pb: 1 }}>
        <Grid item xs={3}>
          <StatusCard />
        </Grid>
        <Grid item xs={3}>
          <StatusCard />
        </Grid>
        <Grid item xs={6}>
          <StatusCard />
        </Grid>
        <Grid item xs={12}>
          <StatusCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Status;
