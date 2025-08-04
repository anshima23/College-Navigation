import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightColor, setHighlightColor] = useState("#007bff");
  const [searchQuery, setSearchQuery] = useState("");

  const getApiPath = (view, date) => {
    switch (view) {
      case "day":
        return `date/${date}`;
      case "week":
        return `week/${date}`;
      case "month":
        return `month/${date}`;
      default:
        return `date/${date}`;
    }
  };

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
        
        const apiPath = getApiPath(view, formattedDate);
        const apiUrl = `/api/events/${apiPath}?t=${Date.now()}`;

        console.log("Fetching events from:", apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchFilteredEvents();
  }, [view, currentDate]);

  const getFilteredEvents = () => {
    if (!searchQuery) return events;
    return events.filter(
      (event) =>
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
                ? `highlight-today-${highlightColor.replace("#", "")}`
                : null
            }
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="events-right">
        <div className="heading-bar">
          <button
            className={view === "day" ? "active" : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
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
                <img
                  src={
                    event.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1bresWcnRlQgHuwMcbo16hOf9tGbzSgvdQ&s"
                  }
                  alt={event.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1bresWcnRlQgHuwMcbo16hOf9tGbzSgvdQ&s";
                  }}
                />
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
