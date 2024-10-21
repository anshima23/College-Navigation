import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './navigate.css';
import axios from 'axios';
import Fuse from 'fuse.js'; // Import fuse.js for fuzzy searching

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
    const [route, setRoute] = useState([]);
    const [currentCoords, setCurrentCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [locations, setLocations] = useState([]); // Store all campus locations

    // Coordinates for Ajay Kumar Garg Engineering College (default center)
    const collegeCoordinates = { lat: 28.6757, lng: 77.5020 };

    // Fetch the list of all possible locations (for fuzzy matching)
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/api/locations'); // Assuming this API returns all campus locations
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);

    // Fuzzy match function to find closest matching location using Fuse.js
    const findClosestLocation = (input) => {
        const fuse = new Fuse(locations, { keys: ['name'], threshold: 0.3 });
        const results = fuse.search(input);
        return results.length > 0 ? results[0].item : null; // Return the best match or null
    };

    const handleFindRoute = async () => {
        console.log("Current Location:", currentLocation);
        console.log("Destination:", destination);

        try {
            // Find closest match for current location
            const currentLocMatch = findClosestLocation(currentLocation);
            if (currentLocMatch) {
                setCurrentCoords(currentLocMatch.coordinates); // Use matched coordinates
            } else {
                console.error("Current location not found");
                return;
            }

            // Find closest match for destination
            const destinationLocMatch = findClosestLocation(destination);
            if (destinationLocMatch) {
                setDestinationCoords(destinationLocMatch.coordinates); // Use matched coordinates
            } else {
                console.error("Destination not found");
                return;
            }

            // Now calculate the shortest path using Dijkstra's algorithm
            const graph = buildGraph(locations); // Build graph based on your map data
            const startNode = currentLocMatch.name;
            const endNode = destinationLocMatch.name;

            const shortestPath = dijkstra(graph, startNode, endNode);
            console.log('Shortest Path:', shortestPath);

            // Convert the node path to coordinates for rendering
            const routeCoordinates = shortestPath.map((nodeName) => {
                const loc = locations.find((loc) => loc.name === nodeName);
                return [loc.coordinates[1], loc.coordinates[0]]; // Leaflet uses [lat, lng]
            });
            setRoute(routeCoordinates);
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    // Build a graph of locations with edges based on distance
    const buildGraph = (locations) => {
        const graph = {};
        locations.forEach((loc) => {
            graph[loc.name] = {};
            loc.connections.forEach((connection) => {
                graph[loc.name][connection.name] = connection.distance; // Store distance as edge weight
            });
        });
        return graph;
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

            <MapContainer center={[collegeCoordinates.lat, collegeCoordinates.lng]} zoom={18} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {currentCoords && (
                    <Marker position={[currentCoords[1], currentCoords[0]]}>
                        <Popup>Current Location</Popup>
                    </Marker>
                )}
                {destinationCoords && (
                    <Marker position={[destinationCoords[1], destinationCoords[0]]}>
                        <Popup>Destination</Popup>
                    </Marker>
                )}

                {route.length > 0 && (
                    <Polyline positions={route} color="darkblue" /> 
                )}
            </MapContainer>
        </div>
    );
};

export default Navigate;