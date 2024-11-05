import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams(); // Get event ID from URL parameters
  const [event, setEvent] = useState(null); // State to hold the event details
  const [loading, setLoading] = useState(true); // Loading state

  // Log the eventId to check if it's correctly captured
  console.log('Event ID from URL params:', eventId);

  // Fetch event details from the backend
  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch event details, status: ${response.status}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEventDetail();
  }, [eventId]);

  if (loading) return <div>Loading...</div>; // Show loading indicator while fetching
  if (!event) return <div>No event found</div>; // Handle case when no event is found

  return (
    <div className="event-detail-container">
      <h1>{event.title}</h1>
      <img src={event.image} alt={event.title} className="event-detail-image" />
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  );
};

export default EventDetail;
