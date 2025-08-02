import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightColor, setHighlightColor] = useState('#007bff');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://college-navigation-1.onrender.com/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const getFilteredEvents = () => {
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    let filteredEvents = [];
    
    if (view === 'day') {
      filteredEvents = events.filter(event => new Date(event.date) >= startOfDay && new Date(event.date) <= endOfDay);
    } else if (view === 'week') {
      filteredEvents = events.filter(event => new Date(event.date) >= startOfWeek && new Date(event.date) <= endOfWeek);
    } else if (view === 'month') {
      filteredEvents = events.filter(event => new Date(event.date) >= startOfMonth && new Date(event.date) <= endOfMonth);
    }

    if (searchQuery) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredEvents;
  };

  const handleColorChange = (color) => {
    setHighlightColor(color);
  };

  return (
    <div className="events-container">
      {/* Left Side */}
      <div className="events-left">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="calendar-container">
          <Calendar
            value={currentDate}
            onChange={setCurrentDate}
            tileClassName={({ date }) =>
              date.toDateString() === new Date().toDateString()
                ? `highlight-today-${highlightColor.replace('#', '')}`
                : null
            }
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="events-right">
        <div className="heading-bar">
          <button
            className={view === 'day' ? 'active' : ''}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={view === 'week' ? 'active' : ''}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className={view === 'month' ? 'active' : ''}
            onClick={() => setView('month')}
          >
            Month
          </button>
        </div>
        
        {/* Display Events */}
        <div className="event-list">
          {getFilteredEvents().length === 0 ? (
            <p>No events for this date.</p>
          ) : (
            getFilteredEvents().map((event) => (
              <div key={event._id} className="event-item">
                <h3>{event.title}</h3>
                <p>{new Date(event.date).toDateString()}</p>
                <p>{event.description}</p>
                <img src={event.image} alt={event.title} />
                <Link to={`/events/${event._id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
