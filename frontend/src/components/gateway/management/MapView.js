import * as React from 'react'
import Map, {Marker} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import {useEffect, useState} from 'react'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function MapView({location}) {
    console.log(`token ${process.env.MAPBOX_TOKEN}`)
    const [data, setData] = useState(location);
    useEffect(()=>{
        setData(location)
        setViewState({...location, zoom: 15})
    }, [location])

    // const [long, setLong] = useState(-122.4)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const fakePayload = serverApi.getBlinkingLocation()
    //         const {lat, long} = fakePayload[0];
    //         setViewState({latitude: lat, longitude: long, zoom: 14})
    //         console.log(fakePayload)
    //         setSensorData(fakePayload)
    //     }, 1000)
    //     return () => clearInterval(interval)
    // }, [])
    // useEffect(() => {
    //     const {long, lat} = sensors;
    //     setSensorData(sensors)
    //     setViewState({latitude: lat, longitude: long, zoom: 14})
    // }, [sensors])
    // const {id, long, lat, color} = sensorData;
    const [viewState, setViewState] = useState({
        latitude: data.latitude,
        longitude: data.longitude,
        zoom: 15
    })
    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: '1500px', height: '500px'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker longitude={data.longitude} latitude={data.latitude} color="red"/>
        </Map>
    );
}

export default MapView;