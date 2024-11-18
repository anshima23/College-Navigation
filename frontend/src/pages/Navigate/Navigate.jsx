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
    const [currentLocation, setCurrentLocation] = useState(''); // Display name of current location
    const [destination, setDestination] = useState(''); // Display name of destination
    const [map, setMap] = useState(null);
    const [routingControl, setRoutingControl] = useState(null);

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

        // Attempt to get the user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const latLng = `${latitude}, ${longitude}`;
                    setCurrentLocation(latLng); // Set current location state as coordinates
                    mapInstance.setView([latitude, longitude], 16); // Center map on user's location

                    // Add a marker for the user's current location
                    L.marker([latitude, longitude]).addTo(mapInstance)
                        .bindPopup("You are here")
                        .openPopup();
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve your location. Please enter it manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }

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
                L.latLng(destination)
            ]);
        } else if (map) {
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(currentLocation.split(',')[0], currentLocation.split(',')[1]),
                    L.latLng(destination)
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
                    setCurrentLocation(`${lat}, ${lon}`); // Store as coordinates internally
                    map.setView([lat, lon], 16); // Center map on new coordinates

                    // Optionally add a marker for the new location
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(inputValue)
                        .openPopup();
                }
            });
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
                    onChange={handleCurrentLocationChange} 
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