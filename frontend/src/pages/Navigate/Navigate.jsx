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
    const [currentLocation, setCurrentLocation] = useState(''); // Current location input
    const [destination, setDestination] = useState(''); // Destination input
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);
    const [currentMarker, setCurrentMarker] = useState(null); // Marker for current location
    const [destinationMarker, setDestinationMarker] = useState(null); // Marker for destination

    useEffect(() => {
        // Initialize the map centered on AKGEC Ghaziabad
        const mapInstance = L.map("map").setView([28.67573005328916, 77.50249762213528], 16); // Center on AKGEC

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19,
        }).addTo(mapInstance);

        setMap(mapInstance); // Set map instance in state

        // Define bounds for AKGEC Ghaziabad (adjust these coordinates as necessary)
        const bounds = L.latLngBounds([
            [28.6720, 77.4970], // Southwest corner (adjust as needed)
            [28.6780, 77.5070]  // Northeast corner (adjust as needed)
        ]);
        
        mapInstance.setMaxBounds(bounds); // Set maximum bounds for the map
        mapInstance.fitBounds(bounds); // Optionally fit the map to these bounds

        return () => {
            if (mapInstance) {
                mapInstance.remove(); // Clean up on unmount
            }
        };
    }, []);

    const findRoute = () => {
        if (routingControl) {
            routingControl.setWaypoints([
                currentMarker ? currentMarker.getLatLng() : null,
                destinationMarker ? destinationMarker.getLatLng() : null,
            ].filter(Boolean)); // Filter out any null values
        } else if (map) {
            const control = L.Routing.control({
                waypoints: [
                    currentMarker ? currentMarker.getLatLng() : null,
                    destinationMarker ? destinationMarker.getLatLng() : null,
                ].filter(Boolean), // Filter out any null values
                routeWhileDragging: true,
                serviceUrl: 'https://router.project-osrm.org/route/v1' // Use a valid routing server URL
            }).addTo(map);

            control.on('routingerror', function(e) {
                console.error("Routing error:", e);
                alert("Failed to find a route.");
            });

            setRoutingControl(control);
        }
    };

    const handleLocationChange = async (inputValue, isCurrentLocation) => {
        console.log(`Fetching coordinates for: ${inputValue}`); // Log input value
        if (inputValue) {
            const geocoderUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(inputValue)}&format=json`;

            try {
                const response = await fetch(geocoderUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Geocoding results:", data); // Log results for debugging
                
                if (data.length > 0) {
                    const { lat, lon } = data[0]; // Get latitude and longitude from results

                    if (isCurrentLocation) {
                        if (!currentMarker) {
                            const marker = L.marker([lat, lon]).addTo(map)
                                .bindPopup("You are here")
                                .openPopup();
                            setCurrentMarker(marker);
                        } else {
                            currentMarker.setLatLng([lat, lon]);
                        }
                        setCurrentLocation(inputValue); // Update state with user input
                        map.setView([lat, lon], 16); // Center map on new coordinates
                    } else {
                        if (!destinationMarker) {
                            const marker = L.marker([lat, lon]).addTo(map)
                                .bindPopup("Destination")
                                .openPopup();
                            setDestinationMarker(marker);
                        } else {
                            destinationMarker.setLatLng([lat, lon]);
                        }
                        setDestination(inputValue); // Update state with user input
                        map.setView([lat, lon], 16); // Center map on new coordinates
                    }
                } else {
                    console.error("No results found.");
                }
            } catch (error) {
                console.error("Error fetching geocoding data:", error);
            }
        }
    };

    return (
        <div>
            <h1>Campus Navigation</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Enter Current Location" 
                    value={currentLocation} 
                    onChange={(e) => setCurrentLocation(e.target.value)} 
                    onBlur={() => handleLocationChange(currentLocation, true)} 
                />
                <input 
                    type="text" 
                    placeholder="Enter Destination" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    onBlur={() => handleLocationChange(destination, false)} 
                />
                <button onClick={findRoute}>Find Route</button>
            </div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div> {/* The map will take full height and width */}
        </div>
    );
};

export default Navigate;