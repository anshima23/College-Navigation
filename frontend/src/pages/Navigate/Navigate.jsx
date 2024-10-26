import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Navigate = () => {
  const ghaziabadCoords = { lat: 28.675126125880514, lng:77.50191154827436};

    // State for the input fields
    const [currentLocation, setCurrentLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');

    const handleRouteSearch = (e) => {
        e.preventDefault();
        console.log('Finding route from:', currentLocation, 'to:', destinationLocation);
        // Here you could call a route-finding function or API
    };

    return (
        <div style={{ height: "100vh", width: "100%", display: 'flex', flexDirection: 'column' }}>
            {/* Input Form */}
            <form onSubmit={handleRouteSearch} style={{ padding: '10px', background: '#f4f4f4' }}>
                <input
                    type="text"
                    placeholder="Current Location"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Destination Location"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    Find Route
                </button>
            </form>

            {/* Map */}
            <MapContainer center={ghaziabadCoords} zoom={18} style={{ flex: 1 }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={ghaziabadCoords}>
                    <Popup>Ghaziabad</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Navigate;
