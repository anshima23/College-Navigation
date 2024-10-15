// src/pages/Events/EventDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();

  // Sample data for demonstration. In a real app, this could come from an API.
  const events = {
    1: {
      name: "Tech Conference 2023",
      description: "A conference about technology advancements.",
      date: "March 15, 2023",
      location: "Tech City Convention Center",
    },
    2: {
      name: "Science Symposium 2022",
      description: "A gathering of scientists and researchers.",
      date: "August 10, 2022",
      location: "Science Hall",
    },
    // Add other events similarly...
    // Assuming IDs match those in Events.jsx
    3: {
      name: "Hackathon 2021",
      description: "An event for coding enthusiasts to collaborate.",
      date: "November 5-7, 2021",
      location: "Innovation Lab",
    },
    // ... (Add all other events)
    // For simplicity, let's assume we only define a few here.
    // You can also fetch this data from an API based on the ID.
    
    // Example for running events
    4: {
      name: "AI & ML Summit 2024",
      description: "Explore the latest in AI and machine learning.",
      date: "April 20, 2024",
      location: "AI Hub",
    },
    // Future events...
    // ... (Add all other events)
    
    // Example for future events
    6: {
      name: "Robotics Expo 2025",
      description: "Showcasing the latest in robotics technology.",
      date: "September 12-14, 2025",
      location: "Expo Center",
    }
    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    

    
    
  
};

const eventDetails = events[id]; // Get the specific event details based on ID

if (!eventDetails) return <p>No event found.</p>;

return (
<div>
<h1>{eventDetails.name}</h1>
<p>{eventDetails.description}</p>
<p><strong>Date:</strong> {eventDetails.date}</p>
<p><strong>Location:</strong> {eventDetails.location}</p>
</div>
);
};

export default EventDetail;