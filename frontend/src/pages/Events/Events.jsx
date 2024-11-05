// src/pages/Events/Events.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]); // State to hold fetched events

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // API endpoint to get events
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Function to categorize events
  const categorizeEvents = (category) => events.filter(event => event.category === category);

  return (
    <div className="events-container">
      <EventCard title="Previous Events" events={categorizeEvents('previous')} />
      <EventCard title="Running Events" events={categorizeEvents('running')} />
      <EventCard title="Future Events" events={categorizeEvents('future')} />
    </div>
  );
};

// Component to display each event card
const EventCard = ({ title, events }) => (
  <div className="event-card">
    <h2>{title}</h2>
    <ul className="event-list">
      {events.map(event => (
        <li key={event._id}>
          <Link to={`/event/${event._id}`}>
            {event.title} - {new Date(event.date).toLocaleString()} {/* Displaying event title and date */}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Events;
