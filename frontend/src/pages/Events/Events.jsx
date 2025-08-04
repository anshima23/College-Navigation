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
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Define getApiPath before using it
  const getApiPath = (view, date) => {
    switch (view) {
      case 'day':
        return `date/${date}`;
      case 'week':
        return `week/${date}`;
      case 'month':
        return `month/${date}`;
      default:
        return `date/${date}`;
    }
  };

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const apiPath = getApiPath(view, formattedDate);
       const apiUrl = `https://college-navigation-1.onrender.com/api/events/${apiPath}?t=${Date.now()}`;

        console.log('Fetching events from:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchFilteredEvents();
  }, [view, currentDate]);

  const getFilteredEvents = () => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
               <p>{new Date(event.dateTime).toDateString()}</p>
                <p>{event.description}</p>
                {event.image && (
                  <img src={event.image} alt={event.title} />
                )}
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
