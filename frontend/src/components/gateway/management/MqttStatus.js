import React, {useState, useEffect} from "react";
import mqtt from "mqtt/dist/mqtt";
import Status from "./Status";

function MqttStatus({setConnectionStatus, gatewayInfo}) {
    const [messages, setMessages] = useState({});
    const record = {
        topic: `/gateway/${gatewayInfo.eui}/status`,
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

    return <Status payload={messages} setConnectionStatus={setConnectionStatus}/>
}

export default MqttStatus;
