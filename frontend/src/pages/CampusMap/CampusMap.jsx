import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import im1 from "../../assets/im1.png";
import campusim from "../../assets/college-map-im1.avif";
import campusim2 from "../../assets/college-map-im2.avif";
import campusim3 from "../../assets/college-map-im3.avif";
import "./CampusMap.css";
import Footer from "../../Components/Footer/footer";



const CampusMap = () => {
  const [buildings, setBuildings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch("/api/buildings");
      const data = await response.json();
      setBuildings(data);
    };
    fetchBuildings();
  }, []);

  return (
    <div className="campus-map">
      {/* Main Photo Section */}
      <div className="main-photo">
        <img
          src={im1} // Replace with the actual path to your image
          alt="Campus Overview"
          className="main-photo-image"
        />
      </div>

      <div className="info-section">
        <h2 className="info-heading">
          Campus and City
        </h2>
        <p className="info-content">
          Georgetown is the best of both worlds – a warm and nurturing campus
          community in a vibrant world-class capital city. Take advantage of all
          campus has to offer, then venture outside our gates and find yourself
          in a global city.
        </p>
      </div>

      <div className="split-section">
        <div className="text-block">
        <h3>
            <Link to="/thrive-campus">Thrive on Campus and Beyond</Link>
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

      <div className="numbered-section">
        <div className="numbered-card">
          <div className="card-number">350+</div>
          <h3 className="card-heading">Academic Excellence</h3>
          <p className="card-content">
            Explore the variety of official student organizations and clubs to
            join
          </p>
        </div>
        <div className="numbered-card">
          <div className="card-number">9</div>
          <h3 className="card-heading">Community</h3>
          <p className="card-content">
            across the campuses and in Georgetown Qatar
          </p>
        </div>
        <div className="numbered-card">
          <div className="card-number">150</div>
          <h3 className="card-heading">Global Impact</h3>
          <p className="card-content">
            with city agencies, schools and community-based organizations
          </p>
        </div>
      </div>

      <div className="image-text-section">
        <div className="image-container">
          <img src={campusim2} alt="Descriptive Alt Text" />
        </div>
        <div className="text-container">
          <h3>
            <Link to="/sports-facilities">Sports Facilities</Link>
          </h3>
          <p>
            Enjoy state-of-the-art sports complexes equipped for a variety of
            activities, from fitness to team sports. Our facilities inspire both
            recreational and competitive athletes to achieve their best.
          </p>
        </div>
      </div>

      <div className="quick-links-section">
        <div className="quick-links-row">
          <h2 className="quick-links-heading">Quick Links</h2>
          <div className="quick-links-container">
            <div className="quick-link-card">
              <h3>
                <Link to="/admissions">Clubs</Link>
              </h3>
            </div>
            <div className="quick-link-card">
              <h3>
                <Link to="/programs">Cells</Link>
              </h3>
            </div>
            <div className="quick-link-card">
              <h3>
                <Link to="/contact-us">Society</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="split-section">
        <div className="text-block">
          <h3>
            <Link to="/hostels">Hostels</Link>
          </h3>
          <p>
            Experience comfortable and secure hostel accommodations that foster
            a sense of community. Our hostels are designed to provide a
            nurturing environment for students to live, study, and thrive.
          </p>
        </div>
        <div className="image-block">
          <img
            src={campusim3} /* Replace with the actual path to your image */
            alt="Discover Georgetown"
          />
        </div>
      </div>
    <div>
      </div>
      <Footer/>
    </div>
  );
};

export default CampusMap;
