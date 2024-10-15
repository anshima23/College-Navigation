// src/pages/Home.jsx
import React from "react";
import { Link } from 'react-router-dom';
import collegeImage from "../../assets/collegen1.jpeg";
import campus from "../../assets/campus.png";
import faculty from "../../assets/faculty.png";
import location from "../../assets/location.png";
import event from "../../assets/event.png";
import "./home.css"; // Ensure to import the CSS
import Footer from "../../Components/Footer/footer";

const Home = () => {
  return (
    <div>
      <div className="hero-container">
        <img src={collegeImage} alt="College" className="college-image" />
        <Link to="/navigate" className="hero-button">Navigate Campus</Link> {/* Wrap button in Link */}
      </div>
      <div className="body-section">
        {/* First Row */}
        <div className="box-row">
          <div className="box">
            <div className="circle-image-container">
              <img src={campus} alt="Explore Campus" className="box-image" />
            </div>
            <Link to="/campus-map" className="box-heading">College Campus</Link>
            <p className="box-description">
              Discover the various facilities available on campus, including
              libraries, laboratories, and recreational areas. Navigate through
              our beautiful grounds and find the resources that enhance your
              academic journey.
            </p>
          </div>
          <div className="box">
            <div className="circle-image-container">
              <img src={faculty} alt="College Faculty" className="box-image" />
            </div>
            <Link to="/college-faculty" className="box-heading">Faculty</Link>
            <p className="box-description">
              Our dedicated faculty members are here to guide you through your
              educational experience. With diverse expertise and a passion for
              teaching, they are committed to your success both inside and
              outside the classroom.
            </p>
          </div>
        </div>
        {/* Second Row */}
        <div className="box-row">
          <div className="box">
            <div className="circle-image-container">
              <img src={location} alt="Track my location" className="box-image" />
            </div>
            <Link to="/track" className="box-heading">Track My Location</Link>
            <p className="box-description">
              Use our mobile app to easily track your location on campus in
              real-time. Find the quickest routes to your classes, events, and
              essential facilities with just a few taps.
            </p>
          </div>
          <div className="box">
            <div className="circle-image-container">
              <img src={event} alt="Events Scheduled" className="box-image" />
            </div>
            <Link to="/events-scheduled" className="box-heading">Event Scheduled</Link> 
            <p className="box-description">
              Stay informed about all upcoming events, workshops, and activities
              happening on campus. Join us for enriching experiences that foster
              community engagement and personal growth.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;