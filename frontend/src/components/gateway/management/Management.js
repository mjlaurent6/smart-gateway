import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CreditCard, Lock, Person, Tune } from "@mui/icons-material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Status from "./Status";

function LinkTab(props) {
  return (
    <Tab
      icon={props.icon}
      iconPosition="start"
      sx={{ ml: 0, mr: 2, minHeight: false, fontSize: 12, fontWeight: 600 }}
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Management() {
  const [page, setPage] = useState(0);

  const handlePage = (event, newValue) => {
    setPage(newValue);
  };

  const [gateway, setGateway] = useState("");

  const handleGateway = (event) => {
    setGateway(event.target.value);
  };

  return (
    <Container sx={{ minWidth: 1500, margin: "auto", overflow: "hidden" }}>
      <FormControl sx={{ mt: 1, mb: 1, width: 300 }} size="small">
        <InputLabel color="dark">Gateway ID</InputLabel>
        <Select
          color="dark"
          value={gateway}
          onChange={handleGateway}
          label="Gateway ID"
        >
          <MenuItem value={"sai-kung-1"}>sai-kung-1</MenuItem>
          <MenuItem value={"tko-1"}>tko-1</MenuItem>
          <MenuItem value={"tko-2"}>tko-2</MenuItem>
        </Select>
      </FormControl>
      <Typography sx={{ mb: 1 }} color="text.dark" variant="h6">
        {gateway}
      </Typography>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          m: 0,
          p: 0,
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent sx={{ fontSize: 12, pt: 1.1, pb: 0, mb: 0 }}>
            Online
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Box sx={{ width: "100%", m: 0, p: 0, mb: 2 }}>
        <Tabs
          sx={{ ml: 0, minHeight: "36px" }}
          value={page}
          onChange={handlePage}
          aria-label="nav tabs example"
          TabIndicatorProps={{
            sx: { bgcolor: "#2196f3", borderRadius: 0 },
          }}
        >
          <LinkTab
            value={0}
            icon={<Person />}
            label="STATUS"
            href="/dashboard/control/content"
          />
          <LinkTab value={1} icon={<Tune />} label="CONTROL" />
          <LinkTab value={2} icon={<Lock />} label="SECURITY" />
          <LinkTab value={3} icon={<CreditCard />} label="ABOUT" />
        </Tabs>
      </Box>
      {page === 0 && <Status />}
      {/*{page === 1 && <Status />}*/}
      {/*{page === 2 && <Status />}*/}
      {/*{page === 3 && <Status />}*/}
    </Container>
  );
}

export default Management;
