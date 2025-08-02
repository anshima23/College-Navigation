import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CampusMap from './pages/CampusMap/CampusMap';
import Faculty from './pages/Faculty/Faculty';
import Events from './pages/Events/Events';
import Navigate from './pages/Navigate/Navigate';
import EventDetail from './pages/Events/EventDetail';
import Track from './pages/Home/Track';
import BuildingDetails from './pages/CampusMap/BuildingDetails';
import ThriveCampus from './pages/CampusMap/thrive-campus';
import SportsFacilities from './pages/CampusMap/sports-facilities';
import Hostels from './pages/CampusMap/hostels';
import Society from './pages/CampusMap/society';
import Clubs from './pages/CampusMap/clubs';
import CollegeCells from './pages/CampusMap/college-cells';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/getData`); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/college-faculty" element={<Faculty />} />
          <Route path="/college-faculty/:id" element={<BuildingDetails />} />
          <Route path="/events-scheduled" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/track" element={<Track />} />
          <Route path="/thrive-campus" element={<ThriveCampus />} />
          <Route path="/sports-facilities" element={<SportsFacilities />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/society" element={<Society />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/college-cells" element={<CollegeCells />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
