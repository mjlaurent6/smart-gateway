import * as React from 'react'
import {render} from 'react-dom'
import Map, {Marker} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import {useEffect, useState} from 'react'

// const MAPBOX_TOKEN = 'pk.eyJ1IjoibWljcm9zdHVjazIiLCJhIjoiY2xjNzc5ZnR5MWYxaTNucGc3dXI1ZW9jbSJ9.oA3eGIumdRb785WUNBlLpg' // Set your mapbox token here
const MAPBOX_TOKEN = 'EMPTY' // Set your mapbox token here

function MapView({sensors}) {
    const [sensorData, setSensorData] = useState(sensors);

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
        latitude: 22.335901,
        longitude: 114.263520,
        zoom: 14
    })
    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            style={{width: '1500px', height: '500px'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker longitude={114.263520} latitude={22.335901} color="red"/>
        </Map>
    );
}

export default MapView;