const socket = io();
let map;

const blueIcon = L.icon({
    iconUrl: '/images/loc.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const otherIcon = L.icon({
    iconUrl: '/images/loc-bl.png', // Use a different icon for other users
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const markers = {}; // Store markers by user ID

const defaultCoordinates = [23.2599, 77.4126];

// Initialize the map and center it on the user's location
function initializeMap(latitude, longitude) {
    if (!map) {
        map = L.map("map").setView([latitude, longitude], 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "OpenStreetMap"
        }).addTo(map);
    }

    // Add or update the user's own marker with the blue icon
    if (!markers['self']) {
        markers['self'] = L.marker([latitude, longitude], { icon: blueIcon }).addTo(map);
    } else {
        markers['self'].setLatLng([latitude, longitude]);
    }
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
