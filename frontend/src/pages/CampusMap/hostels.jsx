import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./hostel.css"; // Create a CSS file for styling if needed
import campusim from "../../assets/college-map-im1.avif";
import campusim2 from "../../assets/college-map-im2.avif";
import Footer from "../../Components/Footer/footer";

const Hostels = () => {
  return (
    <div>
       <div className="info-section">
            <h2 className="info-heading">Hostels</h2>
            <p className="info-content">
              Georgetown is the best of both worlds – a warm and nurturing
              campus community in a vibrant world-class capital city. Take
              advantage of all campus has to offer, then venture outside our
              gates and find yourself in a global city.
            </p>
          </div>
      <div className="split-section">
        <div className="text-block">
          <h3>
            <Link to="/thrive-campus">Girls Hostel</Link>
          </h3>
          <p>
            Discover a vibrant campus life filled with diverse opportunities for
            learning, collaboration, and personal growth. Explore the
            surrounding city to gain real-world experiences beyond the
            classroom.
          </p>
        </div>
        <div className="image-block">
          <img
            src={campusim} /* Replace with the actual path to your image */
            alt="Discover Georgetown"
          />
        </div>
      </div>

      <div className="image-text-section">
        <div className="image-container">
          <img src={campusim2} alt="Descriptive Alt Text" />
        </div>
        <div className="text-container">
          <h3>
            <Link to="/sports-facilities">Boys Hostel</Link>
          </h3>
          <p>
            Enjoy state-of-the-art sports complexes equipped for a variety of
            activities, from fitness to team sports. Our facilities inspire both
            recreational and competitive athletes to achieve their best.
          </p>
        </div>
      </div>

      <div className="split-section">
        <div className="text-block">
          <h3>
            <Link to="/thrive-campus">DDU</Link>
          </h3>
          <p>
            Discover a vibrant campus life filled with diverse opportunities for
            learning, collaboration, and personal growth. Explore the
            surrounding city to gain real-world experiences beyond the
            classroom.
          </p>
        </div>
        <div className="image-block">
          <img
            src={campusim} /* Replace with the actual path to your image */
            alt="Discover Georgetown"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hostels;
