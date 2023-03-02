import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import MapView from "./MapView";
import MqttHeader from "./MqttHeader";

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
        <MqttHeader/>
        <Grid item xs={3}>
          <StatusCard />
        </Grid>
        <Grid item xs={3}>
          <StatusCard />
        </Grid>
        <Grid item xs={6}>
          <StatusCard />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Card elevation={2}>*/}
        {/*    <MapView />*/}
        {/*  </Card>*/}
        {/*</Grid>*/}
      </Grid>
    </React.Fragment>
  );
}

export default Status;
