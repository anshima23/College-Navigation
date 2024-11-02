import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CampusMap.css';

const CampusMap = () => {
    const [buildings, setBuildings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuildings = async () => {
            const response = await fetch('/api/buildings');
            const data = await response.json();
            setBuildings(data);
        };
        fetchBuildings();
    }, []);

    return (
        <div className="campus-map">
            <h1>Campus Map</h1>
            <div className="building-cards">
                {buildings.map(building => (
                    <div key={building._id} className="building-card">
                        <img src={building.imageUrl} alt={building.name} className="building-image" />
                        <h2 className="building-name">{building.name}</h2>
                        <p className="building-description">{building.description}</p>
                        <button className="know-more-button">Know More</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampusMap;
