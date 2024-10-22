// src/pages/Navigate.jsx
import React, { useState } from 'react';
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
    const [currentLocationName, setCurrentLocationName] = useState('');
    const [destinationName, setDestinationName] = useState('');

    const handleFindRoute = async () => {
        const currentCoords = await getCoordinates(currentLocationName);
        const destinationCoords = await getCoordinates(destinationName);

        if (currentCoords) {
            setCurrentLocation(currentCoords);
        }

        if (destinationCoords) {
            setDestination(destinationCoords);
        }

        console.log("Current Location:", currentLocation);
        console.log("Destination:", destination);
    };

    const getCoordinates = async (locationName) => {
        const apiKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const { geometry } = data.results[0];
                return { lat: geometry.lat, lng: geometry.lng };
            } else {
                alert("Location not found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            alert("Error fetching coordinates. Please try again.");
            return null;
        }
    };

    return (
        <div>
            <h1>Welcome to the Navigate Page</h1>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Current Location Name"
                    value={currentLocationName}
                    onChange={(e) => setCurrentLocationName(e.target.value)}
                    style={{ marginBottom: '10px', padding: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Destination Name"
                    value={destinationName}
                    onChange={(e) => setDestinationName(e.target.value)}
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
