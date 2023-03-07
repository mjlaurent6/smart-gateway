import React from "react";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import StatusCard from "../gateway/management/StatusCard";
import {PieChart} from 'react-minimal-pie-chart';

function MockPieChart() {
    const dataMock = [
        {title: 'Forward End Device Packed', value: 10, color: '#E38627'},
        {title: 'Uplink Packet', value: 15, color: '#C13C37'},
        {title: 'Downlink Uplink', value: 20, color: '#6A2135'},
    ]
    return (<Card sx={{height: 400}}>
        <CardContent>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Received Payload (per months)
            </Typography>
            <PieChart
                style={{height: '260px', textAlign: "center"}}
                lineWidth={20}
                paddingAngle={18}
                rounded
                label={({dataEntry}) => Math.round(dataEntry.percentage) + '%'}
                labelStyle={(index) => ({
                    fill: dataMock[index].color,
                    fontSize: '5px',
                    fontFamily: 'sans-serif',
                })}
                labelPosition={60}
                data={dataMock}
            />
            {dataMock.map(({color, title, value}) =>
                <Typography sx={{fontSize: 13}} color={color} gutterBottom>
                    {`${value} MB of ${title}`}
                </Typography>)
            }
        </CardContent>
    </Card>)
}

function MockSingleLabel() {
    return (
        (<Card sx={{height: 400}}>
            <CardContent>
                <Typography sx={{fontSize: 14, mb: 5}} color="text.secondary" gutterBottom>
                    Overall Health
                </Typography>
                <PieChart
                    style={{height: '260px', textAlign: "center"}}
                    data={[{value: 60, color: '#E38627'}]}
                    totalValue={100}
                    lineWidth={20}
                    label={({dataEntry}) => dataEntry.value}
                    labelStyle={{
                        fontSize: '25px',
                        fontFamily: 'sans-serif',
                        fill: '#E38627',
                    }}
                    labelPosition={0}
                />
            </CardContent>
        </Card>)
    )
}

function MockDashboard({title}) {

    return (<Grid container spacing={2} sx={{mt: 1}}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
        </Grid>
        <Grid item xs={3}><StatusCard item={"Registered Devices"} value={50}/></Grid>
        <Grid item xs={3}><StatusCard item={"Connected Devices"} value={30}/></Grid>
        <Grid item xs={3}><StatusCard item={"Online (past 24h)"} value={10}/></Grid>
        <Grid item xs={3}><StatusCard item={"Need Attention"} value={5}/></Grid>
        <Grid item xs={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                }}
            >
                <Chart/>
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <MockPieChart/>
        </Grid>
        <Grid item xs={4}>
            <MockSingleLabel/>
        </Grid>
    </Grid>)
}

export default function Dashboard() {

    return <Container sx={{minWidth: 1500, margin: "auto", overflow: "hidden", pb: 1}}>
        <MockDashboard title={'Gateway'}/>
        <MockDashboard title={'End Device'}/>
    </Container>
}
