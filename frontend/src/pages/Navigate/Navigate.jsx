import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import io from "socket.io-client";
import "./navigate.css";

// ✅ Fix: Import marker images manually
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Fix: Configure Leaflet to use imported icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const socket = io();

const Navigate = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    const mapInstance = L.map("map").setView([28.6757, 77.5025], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInstance);

    const bounds = L.latLngBounds([[28.672, 77.497], [28.678, 77.507]]);
    mapInstance.setMaxBounds(bounds);
    mapInstance.fitBounds(bounds);

    setMap(mapInstance);

    return () => {
      mapInstance.remove(); // Cleanup
    };
  }, []);

  const handleGeocoding = async (inputValue, isCurrentLocation) => {
    if (!inputValue) {
      isCurrentLocation
        ? setCurrentSuggestions([])
        : setDestinationSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      inputValue
    )}&format=json&addressdetails=1&limit=5`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      if (isCurrentLocation) {
        setCurrentSuggestions(data);
      } else {
        setDestinationSuggestions(data);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const addMarker = (location, isCurrentLocation) => {
    const { lat, lon } = location;
    if (!map) return;

    const marker = isCurrentLocation ? currentMarker : destinationMarker;
    const popupText = isCurrentLocation ? "You are here" : "Destination";

    if (!marker) {
      const newMarker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(popupText)
        .openPopup();

      isCurrentLocation
        ? setCurrentMarker(newMarker)
        : setDestinationMarker(newMarker);
    } else {
      marker.setLatLng([lat, lon]);
    }

    map.setView([lat, lon], 16);

    if (isCurrentLocation) {
      setCurrentLocation(location.display_name);
      setCurrentSuggestions([]);
    } else {
      setDestination(location.display_name);
      setDestinationSuggestions([]);
    }

    findRoute();
  };

  const findRoute = () => {
    if (!map || !currentMarker || !destinationMarker) return;

    const startLatLng = currentMarker.getLatLng();
    const endLatLng = destinationMarker.getLatLng();

    if (routingControl) {
      map.removeControl(routingControl);
    }

    const newRoutingControl = L.Routing.control({
      waypoints: [L.latLng(startLatLng), L.latLng(endLatLng)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          draggable: true,
        });
      },
      show: true,
    })
      .on("routesfound", (e) => {
        const routes = e.routes;
        if (routes.length > 0) {
          const route = routes[0];
          console.log("Route summary:", route.summary);
        }
      })
      .addTo(map);

    setRoutingControl(newRoutingControl);
  };

  return (
    <div>
      <h1>Campus Navigation</h1>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Current Location"
            value={currentLocation}
            onChange={(e) => {
              setCurrentLocation(e.target.value);
              handleGeocoding(e.target.value, true);
            }}
          />
          {currentSuggestions.length > 0 && (
            <ul className="suggestions">
              {currentSuggestions.map((loc, idx) => (
                <li key={idx} onClick={() => addMarker(loc, true)}>
                  {loc.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              handleGeocoding(e.target.value, false);
            }}
          />
          {destinationSuggestions.length > 0 && (
            <ul className="suggestions">
              {destinationSuggestions.map((loc, idx) => (
                <li key={idx} onClick={() => addMarker(loc, false)}>
                  {loc.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={findRoute}>Find Route</button>
      </div>

      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default Navigate;
