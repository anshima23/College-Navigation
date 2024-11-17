// src/pages/Track.jsx

import React, { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import io from 'socket.io-client'; // Import Socket.IO client
import "./track.css"; // Import CSS for styling
import userLocationIcon from "../../assets/loc.png";
import otherUserIcon from "../../assets/loc-bl.png";


// Initialize socket connection
const socket = io();

const Track = () => {
    useEffect(() => {
        const blueIcon = L.icon({
            iconUrl: userLocationIcon,// Path to your user's location icon
            iconSize: [20, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        const otherIcon = L.icon({
            iconUrl: otherUserIcon,// Path to other users' icons
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        const markers = {}; // Store markers by user ID
        const defaultCoordinates = [23.2599, 77.4126]; // Default coordinates if geolocation fails

        let map; // Map variable

        // Initialize the map and center it on the user's location
        function initializeMap(latitude, longitude) {
            if (!map) {
                map = L.map("map").setView([latitude, longitude], 16); // Set initial zoom level close to user
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                    maxZoom: 19,
                }).addTo(map);
            }

            // Add or update the user's own marker with the blue icon
            if (!markers['self']) {
                markers['self'] = L.marker([latitude, longitude], { icon: blueIcon }).addTo(map);
            } else {
                markers['self'].setLatLng([latitude, longitude]);
            }

            // Set view to user's location (closer zoom)
            map.setView([latitude, longitude], 16); // Adjust zoom level as needed
        }

        // Watch user's location and emit it to the server
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("Current position:", latitude, longitude);

                    socket.emit("send-location", { latitude, longitude });
                    initializeMap(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    initializeMap(defaultCoordinates[0], defaultCoordinates[1]);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            initializeMap(defaultCoordinates[0], defaultCoordinates[1]);
        }

        // Listen for location updates from other users
        socket.on("receive-location", (data) => {
            const { id, latitude, longitude } = data;

            if (id !== socket.id) { // Avoid updating self
                if (markers[id]) {
                    markers[id].setLatLng([latitude, longitude]);
                } else {
                    markers[id] = L.marker([latitude, longitude], { icon: otherIcon }).addTo(map);
                }
            }
        });

        // Remove a user's marker when they disconnect
        socket.on("user-disconnected", (id) => {
            if (markers[id]) {
                map.removeLayer(markers[id]);
                delete markers[id];
            }
        });

    }, []); // Empty dependency array to run once on mount

    return (
        <div>
            <div id="map"></div> {/* The map will take full height and width */}
        </div>
    );
};

export default Track;