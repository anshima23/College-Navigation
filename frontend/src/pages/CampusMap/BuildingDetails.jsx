import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BuildingDetail.css'; // CSS for detailed view

const BuildingDetail = () => {
    const { id } = useParams(); // Get the building ID from the URL
    const [building, setBuilding] = useState(null);

    useEffect(() => {
        const fetchBuilding = async () => {
            const response = await fetch(`https://college-navigation-1.onrender.com/api/buildings/${id}`);
            const data = await response.json();
            setBuilding(data);
        };
        fetchBuilding();
    }, [id]);

    if (!building) return <div>Loading...</div>; // Loading state

    return (
        <div className="building-detail">
            <h1 className="building-name">{building.name}</h1>
            <img src={building.imageUrl} alt={building.name} className="building-detail-image" />
            <p className="building-description">{building.detailedDescription}</p> {/* Use detailed description here */}
            {/* Additional details about the building can be added here */}
        </div>
    );
};

export default BuildingDetail;
