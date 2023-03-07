import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Container, Grid} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {CreditCard, Lock, Person, Tune} from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MqttStatus from "./MqttStatus";
import {useParams} from "react-router-dom";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {randomCreatedDate} from "@mui/x-data-grid-generator";
import Overview from "./Overview";
import HistoricalView from "./HistoricalView";

function LinkTab(props) {
    return (<Tab
        icon={props.icon}
        iconPosition="start"
        sx={{ml: 0, mr: 2, minHeight: false, fontSize: 12, fontWeight: 600}}
        component="a"
        onClick={(event) => {
            event.preventDefault();
        }}
        {...props}
    />);
}

function RealtimeMonitoring() {
    const [page, setPage] = useState(1);
    const {eui} = useParams();
    const [gateway, setGateway] = useState({});
    const [connectionStatus, setConnectionStatus] = useState(false);
    const handlePage = (event, newValue) => {
        setPage(newValue);
    };
    useEffect(() => {
        fetch(`/api/gateway?eui=${eui}`)
            .then(response => response.json())
            .then(data => setGateway(data.data))
    }, [])
    return (<Container sx={{minWidth: 1500, margin: "auto", overflow: "hidden"}}>
        <Typography sx={{mb: 1}} color="text.dark" variant="h5">
            {gateway.name}
        </Typography>
        <Typography sx={{mb: 1}} color="text.dark" variant="body2">
            EUI: {gateway.eui}
        </Typography>
        <Grid sx={{display: "flex", mb: 1}}>
            {connectionStatus ? (<React.Fragment>
                <FiberManualRecordIcon sx={{mt: 0.4, mr: 1, color: "green", fontSize: "11pt"}}/>
                <Typography color="text.dark" variant="body2">
                    Online
                </Typography>
            </React.Fragment>) : (
                <React.Fragment><FiberManualRecordIcon sx={{mt: 0.4, mr: 1, color: "red", fontSize: "11pt"}}/>
                    <Typography color="text.dark" variant="body2">
                        Offline
                    </Typography></React.Fragment>)}
        </Grid>
        <Box sx={{width: "100%", m: 0, p: 0, mb: 2, borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
                sx={{ml: 0, minHeight: "36px"}}
                value={page}
                onChange={handlePage}
                aria-label="nav tabs example"
                TabIndicatorProps={{
                    sx: {bgcolor: "#2196f3", borderRadius: 0},
                }}
            >
                <LinkTab value={0} icon={<Person/>} label="Overview"/>
                <LinkTab value={1} icon={<Person/>} label="Live Data"/>
                <LinkTab value={2} icon={<CreditCard/>} label="History"/>
                <LinkTab value={3} icon={<Tune/>} label="Control"/>
                <LinkTab value={4} icon={<Lock/>} label="Security"/>
            </Tabs>
        </Box>
        {page === 0 && <Overview gatewayInfo={gateway}/>}
        {page === 1 && Object.keys(gateway).length &&
            <MqttStatus setConnectionStatus={setConnectionStatus} gatewayInfo={gateway}/>}
        {page === 2 && <HistoricalView/>}
        {/*{page === 2 && <Status />}*/}
        {/*{page === 3 && <Status />}*/}
    </Container>);
}

export default RealtimeMonitoring;
