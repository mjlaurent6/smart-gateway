import React, { useState, Fragment, useEffect } from "react";
import mqtt from "mqtt/dist/mqtt";

function MqttHeader() {
    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [messages, setMessages] = React.useState({});
    const record = {
        topic: "/gateway_location/ping",
        qos: 0,
    };
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    // useEffect(() => {
    //     client.subscribe(record.topic, (error) => {
    //         console.log(`Subscribe on ${record.topic}`);
    //
    //         if (error) {
    //             console.log("Subscribe to topics error", error);
    //             return;
    //         }
    //     });
    //     return () => {
    //         client.unsubscribe(record.topic, (error) => {
    //             console.log(`Unsubscribe on ${record.topic}`);
    //             if (error) {
    //                 console.log("Unsubscribe error", error);
    //                 return;
    //             }
    //         });
    //     };
    // }, []);

    useEffect(() => {
        if (client) {
            client.on("connect", () => {
                setConnectionStatus(true);
            });
            client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                console.log("New message");
                setMessages(payload);
            });
        }
    }, [client]);

    return <div>{messages.message}</div>;
}
export default MqttHeader;
