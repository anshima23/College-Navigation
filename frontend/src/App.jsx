// src/App.jsx
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CampusMap from './pages/CampusMap/CampusMap';
import Faculty from './pages/Faculty/Faculty';
import Events from './pages/Events/Events';
import Navigate from './pages/Navigate/Navigate';
import EventDetail from './pages/Events/EventDetail'; // Import the EventDetail component

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:8000/getData");
    setData(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <div>{data}</div>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navigate" element={<Navigate />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/college-faculty" element={<Faculty />} />
          <Route path="/events-scheduled" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
