import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './navigate.css';

// Fix leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Navigate = () => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [route, setRoute] = useState([]);
    const [currentCoords, setCurrentCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const googleApiKey = 'AIzaSyCErxx3p0xDUggPQRATuh4MQRmkhvbOUEM';  // Replace with your actual API key
    const defaultCoordinates = { lat: 28.675844919559324, lng: 77.50251580188298 };

    // Fetch coordinates from Google Maps Geocoding API
      const getCoordinates = async (address) => {
        try {
            console.log('Address:', address);
            const response = await axios.get(`http://localhost:3000/api/locations/coordinates`, {
                params: {
                    name: address, // Pass the address as a parameter
                }
            });
    
            console.log('API URL:', `http://localhost:3000/api/locations/coordinates?name=${address}`);
    
            if (response.data) {
                return response.data.coordinates; // Assuming coordinates is an array [lng, lat]
            } else {
                throw new Error('Location not found');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error.response ? error.response.data : error.message);
            return null;
        }
    };
    

    // Fetch the route from Google Directions API
    const getDirections = async (originCoords, destinationCoords) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
                params: {
                    origin: `${originCoords[0]},${originCoords[1]}`,
                    destination: `${destinationCoords[0]},${destinationCoords[1]}`,
                    key: googleApiKey,
                },
            });

            if (response.data.routes.length > 0) {
                const routePath = response.data.routes[0].overview_polyline.points;
                const decodedPath = decodePolyline(routePath);
                return decodedPath;
            } else {
                throw new Error('No route found');
            }
        } catch (error) {
            console.error('Error fetching route:', error);
            setError('Failed to calculate route');
            return [];
        }
    };

    // Polyline decoding function
    const decodePolyline = (encoded) => {
        let points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push([lat * 1e-5, lng * 1e-5]);
        }

        return points;
    };

    const handleFindRoute = async () => {
        setError(null);
        setRoute([]);
        setLoading(true);

        if (!currentLocation || !destination) {
            setError('Please provide both current location and destination.');
            setLoading(false);
            return;
        }

        try {
            // Get coordinates for current location and destination
            const currentCoords = await getCoordinates(currentLocation);
            const destinationCoords = await getCoordinates(destination);

            if (!currentCoords || !destinationCoords) {
                setError('Invalid current location or destination.');
                return;
            }

            setCurrentCoords(currentCoords);
            setDestinationCoords(destinationCoords);

            // Get route from Google Directions API
            const routePath = await getDirections(currentCoords, destinationCoords);
            if (routePath.length === 0) {
                setError('No route found.');
            } else {
                setRoute(routePath);
            }
        } catch (error) {
            console.error("Error fetching route:", error);
            setError("Error calculating route. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="navigate-container">
            <h1>Navigate Using Google Directions API</h1>
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
            {loading && <p className="loading">Calculating route...</p>}
            {error && <p className="error">{error}</p>}

            <MapContainer center={defaultCoordinates} zoom={18} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentCoords && (
                    <Marker position={currentCoords}>
                        <Popup>Current Location</Popup>
                    </Marker>
                )}
                {destinationCoords && (
                    <Marker position={destinationCoords}>
                        <Popup>Destination</Popup>
                    </Marker>
                )}
                {route.length > 0 && (
                    <Polyline positions={route} color="blue" />
                )}
            </MapContainer>
        </div>
    );
};

export default Navigate;
