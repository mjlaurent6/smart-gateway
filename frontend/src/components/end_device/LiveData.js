import React, {useState, useEffect} from "react";
import mqtt from "mqtt/dist/mqtt";
import LiveDataGrid from "./LiveDataView";
import LiveDataView from "./LiveDataView";

function LiveData({setConnectionStatus, endDeviceInfo}) {
    const [messages, setMessages] = useState({});
    const record = {
        topic: `/end_device/${endDeviceInfo.devEui}/message`,
        qos: 0,
    };
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
    useEffect(() => {
        client.subscribe(record.topic, (error) => {
            console.log(`Subscribe on ${record.topic}`);
            if (error) {
                console.log("Subscribe to topics error", error);
                return;
            }
        });
        return () => {
            client.unsubscribe(record.topic, (error) => {
                console.log(`Unsubscribe on ${record.topic}`);
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
            });
        };
    }, []);

    useEffect(() => {
        if (client) {
            client.on("connect", () => {
            });
            client.on("message", (topic, message) => {
                const payload = {topic, message: message.toString()};
                setConnectionStatus(true);
                setMessages(payload);
            });
        }
    }, [client]);

    return <LiveDataView/>
}

export default LiveData;
