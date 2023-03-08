import React, {useState, useEffect} from "react";
import mqtt from "mqtt/dist/mqtt";
import Status from "./Status";
import Control from "./Control";

function MqttControl({setConnectionStatus}) {
    const [messages, setMessages] = useState({});
    const end_device = {
        'eui': 'test123'
    }
    const topic = 'ping'
    const record = {
        topic: `/gateway/control/${end_device.eui}`,
        qos: 0,
    };

    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    useEffect(() => {
        client.subscribe(`${record.topic}/response`, (error) => {
            console.log(`Subscribe on ${record.topic}/response`);
            if (error) {
                console.log("Subscribe to topics error", error);
                return;
            }
        });
        return () => {
            client.unsubscribe(`${record.topic}/response`, (error) => {
                console.log(`Unsubscribe on ${record.topic}/response`);
                if (error) {
                    console.log("Unsubscribe error", error);
                    return;
                }
            });
        };
    }, []);

    const mqttPublish = (context) => {
        if (client) {
            const {topic, qos, payload} = context;
            console.log(`Publish to ${topic}: ${payload}`)
            client.publish(topic, payload, {qos}, error => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    }

    return <Control publisher={mqttPublish} prefix_topic={record.topic} client={client}
                    setConnectionStatus={setConnectionStatus}/>
}

export default MqttControl;
