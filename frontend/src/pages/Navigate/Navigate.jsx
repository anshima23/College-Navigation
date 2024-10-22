import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './navigate.css';
import axios from 'axios';
import Fuse from 'fuse.js';

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
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const collegeCoordinates = { lat: 28.675844919559324, lng: 77.50251580188298 };

    // Fetch all locations on mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/locations');

                console.log('API Response:', response); // Log the full response object
                console.log('Data:', response.data); // Log the specific data

                if (response.data && Array.isArray(response.data)) {
                    setLocations(response.data);
                } else {
                    console.error('Invalid locations data:', response.data);
                    setError('Invalid locations data received.');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setError('Error fetching locations. Please try again later.');
            } finally {
                setLoading(false); // End loading state
            }
        };
        fetchLocations();
    }, []);

    // Find closest matching location using Fuse.js
    const findClosestLocation = (input) => {
        if (!Array.isArray(locations) || locations.length === 0) {
            console.error("Locations data is missing or invalid.");
            return null;
        }

        const fuse = new Fuse(locations, { keys: ['name'], threshold: 0.3 });
        const results = fuse.search(input);
        return results.length > 0 ? results[0].item : null; // Return the closest match or null
    };

    const handleFindRoute = async () => {
        try {
            // Find closest match for current location
            const currentLocMatch = findClosestLocation(currentLocation);
            console.log("Current Location Match:", currentLocMatch);

            if (!currentLocMatch || !currentLocMatch.coordinates) {
                console.error("Current location not found or invalid.");
                return;
            }
            setCurrentCoords(currentLocMatch.coordinates);

            // Find closest match for destination
            const destinationLocMatch = findClosestLocation(destination);
            console.log("Destination Location Match:", destinationLocMatch);

            if (!destinationLocMatch || !destinationLocMatch.coordinates) {
                console.error("Destination not found or invalid.");
                return;
            }
            setDestinationCoords(destinationLocMatch.coordinates);

            // Calculate the shortest path using Dijkstra's algorithm
            const graph = buildGraph(locations);
            const startNode = currentLocMatch.name;
            const endNode = destinationLocMatch.name;

            const shortestPath = dijkstra(graph, startNode, endNode);
            console.log('Shortest Path:', shortestPath);

            if (!shortestPath || shortestPath.length === 0) {
                console.error('No path found.');
                return;
            }

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

    const buildGraph = (locations) => {
        const graph = {};
        locations.forEach((loc) => {
            if (loc.connections && Array.isArray(loc.connections)) {
                graph[loc.name] = {};
                loc.connections.forEach((connection) => {
                    graph[loc.name][connection.name] = connection.distance;
                });
            }
        });
        return graph;
    };

    const dijkstra = (graph, startNode, endNode) => {
        const distances = {};
        const prevNodes = {};
        const pq = new Set(Object.keys(graph));

        pq.forEach((node) => {
            distances[node] = Infinity;
            prevNodes[node] = null;
        });
        distances[startNode] = 0;

        while (pq.size > 0) {
            const currentNode = Array.from(pq).reduce((minNode, node) =>
                distances[node] < distances[minNode] ? node : minNode
            );

            pq.delete(currentNode);

            if (currentNode === endNode) break;

            Object.keys(graph[currentNode]).forEach((neighbor) => {
                const alt = distances[currentNode] + graph[currentNode][neighbor];
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    prevNodes[neighbor] = currentNode;
                }
            });
        }

        const path = [];
        let current = endNode;
        while (current) {
            path.unshift(current);
            current = prevNodes[current];
        }
        return path;
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
            {loading && <p>Loading locations...</p>} {/* Show loading state */}
            {error && <p className="error">{error}</p>} {/* Show error if any */}

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
