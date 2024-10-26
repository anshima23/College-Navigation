import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const Navigate = () => {
    const ghaziabadCoords = { lat: 28.675427341225614, lng: 77.50212612498878 };
    
    const [currentLocation, setCurrentLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [route, setRoute] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const handleRouteSearch = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Get coordinates for current and destination locations
        const geocodeUrl = (address) => 
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCdbxavGc0K7tyYaqmNMF4_TBfy6qNlnIA`;

        const currentLocResponse = await fetch(geocodeUrl(currentLocation));
        const destinationLocResponse = await fetch(geocodeUrl(destinationLocation));

        const currentLocData = await currentLocResponse.json();
        const destinationLocData = await destinationLocResponse.json();
       
        if (currentLocData.results.length > 0 && destinationLocData.results.length > 0) {
            const currentCoords = currentLocData.results[0].geometry.location;
            const destinationCoords = destinationLocData.results[0].geometry.location;

            const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentCoords.lat},${currentCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&key=AIzaSyCdbxavGc0K7tyYaqmNMF4_TBfy6qNlnIA`;
            const directionsResponse = await fetch(directionsUrl);
            const directionsData = await directionsResponse.json();

            if (directionsData.routes.length > 0) {
                const points = directionsData.routes[0].legs[0].steps.map(step => {
                    return { lat: step.end_location.lat, lng: step.end_location.lng };
                });
                setRoute(points);
            } else {
                alert('No route found');
            }
        } else {
            alert('Could not find the locations');
        }

        setLoading(false); // Stop loading
    };

    return (
        <div style={{ height: "100vh", width: "100%", display: 'flex', flexDirection: 'column' }}>
            {/* Input Form */}
            <form onSubmit={handleRouteSearch} style={{ padding: '10px', background: '#f4f4f4' }}>
                <input
                    type="text"
                    placeholder="Current Location"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Destination Location"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    Find Route
                </button>
            </form>

            {/* Map */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Loading...</h2>
                </div>
            ) : (
                <LoadScript googleMapsApiKey="YOUR_API_KEY">
                    <GoogleMap
                        center={ghaziabadCoords}
                        zoom={18}
                        mapContainerStyle={{ flex: 1 }}
                    >
                        <Marker position={ghaziabadCoords} />
                        {route.length > 0 && (
                            <Polyline path={route} options={{ strokeColor: "#0000FF", strokeOpacity: 0.8, strokeWeight: 2 }} />
                        )}
                    </GoogleMap>
                </LoadScript>
            )}
        </div>
    );
};

export default Navigate;
