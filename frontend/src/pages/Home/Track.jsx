import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Track({ socket }) {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState({});
  const defaultCoordinates = [23.2599, 77.4126]; // Default to Bhopal

  const blueIcon = L.icon({
    iconUrl: '/images/loc.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const otherIcon = L.icon({
    iconUrl: '/images/loc-bl.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    // Initialize map on first render
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(defaultCoordinates, 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap',
      }).addTo(mapRef.current);
    }

    // Watch for user's location updates
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('send-location', { latitude, longitude });
          updateMarker('self', latitude, longitude, blueIcon);
        },
        (error) => {
          console.error('Geolocation error:', error);
          updateMarker('self', defaultCoordinates[0], defaultCoordinates[1], blueIcon);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }

    // Handle incoming location updates for other users
    socket.on('receive-location', ({ id, latitude, longitude }) => {
      if (id !== socket.id) {
        updateMarker(id, latitude, longitude, otherIcon);
      }
    });

    // Remove markers on user disconnect
    socket.on('user-disconnected', (id) => {
      if (markers[id]) {
        mapRef.current.removeLayer(markers[id]);
        setMarkers((prev) => {
          const updatedMarkers = { ...prev };
          delete updatedMarkers[id];
          return updatedMarkers;
        });
      }
    });

    return () => {
      socket.off('receive-location');
      socket.off('user-disconnected');
    };
  }, [socket, markers]);

  // Function to add/update marker on the map
  const updateMarker = (id, lat, lng, icon) => {
    if (!markers[id]) {
      const newMarker = L.marker([lat, lng], { icon }).addTo(mapRef.current);
      setMarkers((prev) => ({ ...prev, [id]: newMarker }));
    } else {
      markers[id].setLatLng([lat, lng]);
    }
  };

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
}

export default Track;
