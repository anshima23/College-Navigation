// src/pages/campusmap/BuildingDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BuildingDetails = () => {
    const { id } = useParams();
    const [building, setBuilding] = useState(null);

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            const response = await fetch(`/api/buildings/${id}`);
            const data = await response.json();
            setBuilding(data);
        };
        fetchBuildingDetails();
    }, [id]);

    if (!building) {
        return <div>Loading...</div>;
    }

    return (
        <div className="building-details">
            <h1>{building.name}</h1>
            <p>{building.description}</p>
            <p>Location: {building.location.coordinates.join(', ')}</p>
        </div>
    );
};

export default BuildingDetails;
