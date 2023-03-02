export const SAMPLE_MQTT_RESPONSE = {
    "topic": "/gateway_location/this_gateway",
    "message": {
        "identifiers": [
            {
                "gateway_ids": {
                    "gateway_id": "eui-0016c001f160f1b2",
                    "eui": "0016C001F160F1B2"
                }
            }
        ],
        "time": "2023-02-05T10:34:12Z",
        "antenna_locations": [
            {
                "latitude": 22.30949,
                "longitude": 114.25795,
                "altitude": 10,
                "source": "SOURCE_GPS"
            }
        ],
        "metrics": {
            "ackr": 0,
            "txin": 0,
            "txok": 0,
            "temp": 37.4,
            "rxin": 0,
            "rxok": 0,
            "rxfw": 0,
            "batt": 90,
        }
    }
}