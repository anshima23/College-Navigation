// src/pages/Home/Navigate.jsx

import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine
import 'leaflet-control-geocoder'; // Import Leaflet Control Geocoder
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
                L.latLng(currentLocation.split(',')[0], currentLocation.split(',')[1]), 
                L.latLng(destination.split(',')[0], destination.split(',')[1]) // Ensure correct parsing of destination
            ]);
        } else if (map) {
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(currentLocation.split(',')[0], currentLocation.split(',')[1]),
                    L.latLng(destination.split(',')[0], destination.split(',')[1]) // Ensure correct parsing of destination
                ],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim() // Use Nominatim for geocoding
            }).addTo(map);
            setRoutingControl(control);
        }
    };

    const handleCurrentLocationChange = async (e) => {
        const inputValue = e.target.value;
        setCurrentLocation(inputValue);

        if (inputValue) {
            const geocoder = L.Control.Geocoder.nominatim();
            geocoder.geocode(inputValue, (results) => {
                if (results.length > 0) {
                    const { lat, lon } = results[0].center; // Get latitude and longitude from results
                    
                    if (!currentMarker) {
                        // Create a new marker for the current location if it doesn't exist
                        const marker = L.marker([lat, lon]).addTo(map)
                            .bindPopup("You are here")
                            .openPopup();
                        setCurrentMarker(marker);
                    } else {
                        // Move existing marker to new location
                        currentMarker.setLatLng([lat, lon]);
                    }

                    map.setView([lat, lon], 16); // Center map on new coordinates
                } else {
                    console.error("No results found for current location.");
                }
            });
        }
    };

    const handleDestinationChange = async (e) => {
        const inputValue = e.target.value;
        setDestination(inputValue);

        if (inputValue) {
            const geocoder = L.Control.Geocoder.nominatim();
            geocoder.geocode(inputValue, (results) => {
                if (results.length > 0) {
                    const { lat, lon } = results[0].center; // Get latitude and longitude from results
                    
                    if (!destinationMarker) {
                        // Create a new marker for the destination if it doesn't exist
                        const marker = L.marker([lat, lon]).addTo(map)
                            .bindPopup("Destination")
                            .openPopup();
                        setDestinationMarker(marker);
                    } else {
                        // Move existing marker to new location
                        destinationMarker.setLatLng([lat, lon]);
                    }

                    map.setView([lat, lon], 16); // Center map on new coordinates
                } else {
                    console.error("No results found for destination.");
                }
            });
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
                    onChange={handleCurrentLocationChange} 
                />
                <input 
                    type="text" 
                    placeholder="Enter Destination" 
                    value={destination} 
                    onChange={handleDestinationChange} 
                />
                <button onClick={findRoute}>Find Route</button>
            </div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div> {/* The map will take full height and width */}
        </div>
    );
};

export default Navigate;