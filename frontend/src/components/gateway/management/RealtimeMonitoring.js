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
    const [page, setPage] = useState(0);
    const {id} = useParams();
    const [gateway, setGateway] = useState({
        id: "eui-1016c001f160f149",
        name: 'Waveshare SX1303 868M fyp-gch6-2',
        eui: '0016c001f160f149',
        dateCreated: randomCreatedDate(),
        link: '0016c001f160f149',
    });
    const [connectionStatus, setConnectionStatus] = useState(false);
    const handlePage = (event, newValue) => {
        setPage(newValue);
    };
    // useEffect(() => {
    //
    // }, [])
    return (<Container sx={{minWidth: 1500, margin: "auto", overflow: "hidden"}}>
        <Typography sx={{mb: 1}} color="text.dark" variant="h5">
            {gateway.name}
        </Typography>
        <Typography sx={{mb: 1}} color="text.dark" variant="body2">
            EUI: {gateway.eui}
        </Typography>
        <Grid sx={{display: "flex", mb: 1}}>
            {connectionStatus ?
                (<React.Fragment>
                        <FiberManualRecordIcon sx={{mt: 0.4, mr: 1, color: "green", fontSize: "11pt"}}/>
                        <Typography color="text.dark" variant="body2">
                            Online
                        </Typography>
                    </React.Fragment>
                ) :
                (<React.Fragment><FiberManualRecordIcon sx={{mt: 0.4, mr: 1, color: "red", fontSize: "11pt"}}/>
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
                <LinkTab value={0} icon={<Person/>} label="Status"/>
                <LinkTab value={1} icon={<Tune/>} label="Control"/>
                <LinkTab value={2} icon={<Lock/>} label="Security"/>
                <LinkTab value={3} icon={<CreditCard/>} label="About"/>
            </Tabs>
        </Box>
        {page === 0 && <MqttStatus setConnectionStatus={setConnectionStatus}/>}
        {/*{page === 1 && <Status />}*/}
        {/*{page === 2 && <Status />}*/}
        {/*{page === 3 && <Status />}*/}
    </Container>);
}

export default RealtimeMonitoring;