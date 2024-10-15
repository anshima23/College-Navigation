// src/pages/Navigate.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker icon images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Navigate = () => {
    const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: New York City
    const [destination, setDestination] = useState({ lat: 34.0522, lng: -118.2437 }); // Default: Los Angeles

    const handleFindRoute = () => {
        // Logic for route finding can be implemented here
        console.log("Current Location:", currentLocation);
        console.log("Destination:", destination);
    };

    return (
        <div>
            <h1>Welcome to the Navigate Page</h1>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Current Location (lat,lng)"
                    value={`${currentLocation.lat},${currentLocation.lng}`}
                    onChange={(e) => {
                        const [lat, lng] = e.target.value.split(',').map(Number);
                        setCurrentLocation({ lat, lng });
                    }}
                    style={{ marginBottom: '10px', padding: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Destination (lat,lng)"
                    value={`${destination.lat},${destination.lng}`}
                    onChange={(e) => {
                        const [lat, lng] = e.target.value.split(',').map(Number);
                        setDestination({ lat, lng });
                    }}
                    style={{ marginBottom: '10px', padding: '10px' }}
                />
                <button onClick={handleFindRoute} style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff' }}>
                    Find Route
                </button>
            </div>

            <MapContainer center={currentLocation} zoom={5} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={currentLocation}>
                    <Popup>Current Location</Popup>
                </Marker>
                <Marker position={destination}>
                    <Popup>Destination</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Navigate;