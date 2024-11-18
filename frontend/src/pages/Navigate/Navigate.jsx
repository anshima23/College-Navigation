// src/pages/Home/Navigate.jsx

import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import io from 'socket.io-client'; // Import Socket.IO client
import "./navigate.css"; // Import CSS for styling

// Initialize socket connection
const socket = io();

const Navigate = () => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);

    useEffect(() => {
        // Initialize the map
        const mapInstance = L.map("map").setView([23.2599, 77.4126], 16); // Initial view

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19,
        }).addTo(mapInstance);

        setMap(mapInstance); // Set map instance in state

        return () => {
            if (mapInstance) {
                mapInstance.remove(); // Clean up on unmount
            }
        };
    }, []);

    const findRoute = () => {
        if (routingControl) {
            routingControl.setWaypoints([
                L.latLng(currentLocation), 
                L.latLng(destination)
            ]);
        } else if (map) {
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(currentLocation),
                    L.latLng(destination)
                ],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim() // Use Nominatim for geocoding
            }).addTo(map);
            setRoutingControl(control);
        }
    };

    return (
        <div>
            <h1>Campus Navigation</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter Current Location" 
                    value={currentLocation} 
                    onChange={(e) => setCurrentLocation(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Enter Destination" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                />
                <button onClick={findRoute}>Find Route</button>
            </div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div> {/* The map will take full height and width */}
        </div>
    );
};

export default Navigate;