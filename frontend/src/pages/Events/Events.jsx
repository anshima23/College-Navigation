// src/pages/Events/Events.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Events.css';

const Events = () => {
  const [expandedBlock, setExpandedBlock] = useState(null);

  const events = {
    previous: [
      { id: 1, name: 'Tech Conference 2023', description: 'A conference about technology advancements.' },
      { id: 2, name: 'Science Symposium 2022', description: 'A gathering of scientists and researchers.' },
      { id: 3, name: 'Hackathon 2021', description: 'An event for coding enthusiasts to collaborate.' },
    ],
    running: [
      { id: 4, name: 'AI & ML Summit 2024', description: 'Explore the latest in AI and machine learning.' },
      { id: 5, name: 'Cloud Computing Workshop', description: 'Hands-on workshop on cloud technologies.' },
    ],
    future: [
      { id: 6, name: 'Robotics Expo 2025', description: 'Showcasing the latest in robotics technology.' },
      { id: 7, name: 'Space Exploration Seminar', description: 'Discussing future missions to space.' },
    ],
  };

  const handleExpand = (blockName) => {
    setExpandedBlock(expandedBlock === blockName ? null : blockName);
  };

  return (
    <div className="event-page">
      {/* Previous Events Block */}
      <div className="event-block big-block">
        <div className="event-content">
          <img src="path/to/previous-events-image.jpg" alt="Previous Events" />
          <div className="event-text">
            <h2 onClick={() => handleExpand('previous')}>
              Previous Events {expandedBlock === 'previous' ? '▲' : '▼'}
            </h2>
            <p>Here you can find a list of previous events we have held over the years.</p>
          </div>
        </div>
        {expandedBlock === 'previous' && (
          <ul className="event-list">
            {events.previous.map((event) => (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link> {/* Link to event details */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Running Events Block */}
      <div className="event-block big-block">
        <div className="event-content">
          <img src="path/to/running-events-image.jpg" alt="Running Events" />
          <div className="event-text">
            <h2 onClick={() => handleExpand('running')}>
              Running Events {expandedBlock === 'running' ? '▲' : '▼'}
            </h2>
            <p>Stay updated with the events currently happening.</p>
          </div>
        </div>
        {expandedBlock === 'running' && (
          <ul className="event-list">
            {events.running.map((event) => (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link> {/* Link to event details */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Future Events Block */}
      <div className="event-block big-block">
        <div className="event-content">
          <img src="path/to/future-events-image.jpg" alt="Future Events" />
          <div className="event-text">
            <h2 onClick={() => handleExpand('future')}>
              Future Events {expandedBlock === 'future' ? '▲' : '▼'}
            </h2>
            <p>Here are some exciting future events to look forward to!</p>
          </div>
        </div>
        {expandedBlock === 'future' && (
          <ul className="event-list">
            {events.future.map((event) => (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link> {/* Link to event details */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;