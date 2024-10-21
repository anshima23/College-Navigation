// src/pages/Navigate.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './navigate.css'; // Import the CSS file

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
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');

    // Coordinates for Ajay Kumar Garg Engineering College
    const collegeCoordinates = { lat: 28.6757, lng: 77.5020 };

    const handleFindRoute = () => {
        // Logic for route finding can be implemented here
        console.log("Current Location:", currentLocation);
        console.log("Destination:", destination);
        // You might want to implement geocoding here to convert text to lat/lng
    };

    return (
        <div className="navigate-container">
            <h1>Welcome to the Navigate Page</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Current Location"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <button onClick={handleFindRoute}>Find Route</button>
            </div>

            <MapContainer center={[collegeCoordinates.lat, collegeCoordinates.lng]} zoom={15} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[collegeCoordinates.lat, collegeCoordinates.lng]}>
                    <Popup>Ajay Kumar Garg Engineering College</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Navigate;