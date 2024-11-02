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
import BuildingDetails from './pages/CampusMap/BuildingDetails';

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    setData(response.data);
  }

  useEffect(() => {
    getData();
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
          <Route path="/building/:id" element={<BuildingDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
