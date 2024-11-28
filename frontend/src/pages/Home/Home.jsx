import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import im1 from "../../assets/im1.png";
import im2 from "../../assets/im2.webp";
import im3 from "../../assets/im3.png";
import campus from "../../assets/campus.png";
import faculty from "../../assets/faculty.png";
import location from "../../assets/location.png";
import event from "../../assets/event.png";
import Footer from "../../Components/Footer/footer";
import "./home.css";

const Home = () => {
  const images = [im1, im2, im3];
  const textSequence = [
    "Navigate campus seamlessly",
    "Discover faculty and facilities",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3300); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  useEffect(() => {
    const handleTyping = () => {
      const currentSentence = textSequence[textIndex];
      if (!isDeleting) {
        // Typing animation
        setCurrentText((prev) =>
          currentSentence.substring(0, prev.length + 1)
        );
        if (currentText === currentSentence) {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      } else {
        // Deleting animation
        setCurrentText((prev) =>
          currentSentence.substring(0, prev.length - 1)
        );
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textSequence.length);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, 100);

    return () => clearInterval(typingInterval);
  }, [currentText, isDeleting, textSequence, textIndex]);

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <div className="hero-container">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="college-image"
        />
        <div className="text-overlay">{currentText}</div>
        <Link to="/navigate" className="hero-button">
          Navigate Campus
        </Link>
      </div>

      {/* Body Section */}
      <div className="body-section">
        {/* First Row */}
        <div className="box-row">
          <div className="box">
            <div className="circle-image-container">
              <img src={campus} alt="Explore Campus" className="box-image" />
            </div>
            <Link to="/campus-map" className="box-heading">
              College Campus
            </Link>
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
            <Link to="/college-faculty" className="box-heading">
              Faculty
            </Link>
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
            <Link to="/track" className="box-heading">
              Track My Location
            </Link>
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
            <Link to="/events-scheduled" className="box-heading">
              Event Scheduled
            </Link>
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
