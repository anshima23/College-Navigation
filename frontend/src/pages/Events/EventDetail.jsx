import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`/api/events/${id}`); // ✅ Relative path for production
        if (!response.ok) throw new Error(`Failed to fetch event details, status: ${response.status}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>No event found</div>;

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
