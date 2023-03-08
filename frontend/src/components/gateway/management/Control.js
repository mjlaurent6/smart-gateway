import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {SAMPLE_MQTT_RESPONSE} from "../../../utils/sampleResponse";
import JsonViewer from "./JsonViewer";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


const functionalities = [
    {name: "Ping", topic: "anything"},
    {name: "Reboot", topic: "anything"},
    {name: "Status", topic: "anything"},
    {name: "Update", topic: "anything"},
]

function BasicCard({name, topic, handler, prefix_topic}) {
    const handlePublish = () => {
        const context = {topic: `${prefix_topic}/${topic}`, qos: 1, payload: 'hello'}
        handler(context)
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handlePublish}>{topic}</Button>
            </CardActions>
        </Card>
    );
}

export default function Control({publisher, prefix_topic, client, setConnectionStatus}) {
    const [response, setResponse] = useState({});
    useEffect(() => {
        if (client) {
            client.on("connect", () => {
            });
            client.on("message", (topic, message) => {
                const payload = {topic, message: JSON.parse(message.toString())};
                setConnectionStatus(true);
                setResponse(payload);
                console.log(payload)
            });
        }
    }, [client]);

    return <Grid container spacing={2} sx={{mt: 1, mb: 1}}>
        {functionalities.map(({name, topic}, index) =>
            <Grid key={`${index}-${name}`} item xs={3}>
                <BasicCard name={name} topic={topic} prefix_topic={prefix_topic} handler={publisher}/>
            </Grid>
        )}
        <Grid item xs={12} sx={{bgColor: "white"}}>
            <Card>
                <CardContent>
                    <Typography>Response</Typography>
                </CardContent>
                <React.Fragment>
                    {response && <Editor
                        value={JSON.stringify(response, null, 2)}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }}
                    />}
                </React.Fragment>
            </Card>
        </Grid>
    </Grid>
}