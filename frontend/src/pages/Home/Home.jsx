import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import im1 from "../../assets/im1.png";
import im2 from "../../assets/im2.webp";
import im3 from "../../assets/im3.png";
import campus from "../../assets/campus.png";
import boxim1 from "../../assets/boxim1.jpg";
import boxim2 from "../../assets/boxim2.jpg";
import boxim3 from "../../assets/boxim3.jpg";
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

  const carouselData = [
    {
      image: im1,
      text: "Explore your academic journey with ease and efficiency.",
    },
    {
      image: im2,
      text: "Stay informed about upcoming events and resources.",
    },
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselChange = (index) => {
    setCarouselIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3300);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleTyping = () => {
      const currentSentence = textSequence[textIndex];
      if (!isDeleting) {
        setCurrentText((prev) =>
          currentSentence.substring(0, prev.length + 1)
        );
        if (currentText === currentSentence) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
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
      {/* Hero Section */}
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
          <div className="box">
            <div className="circle-image-container">
              <img src={location} alt="Track my location" className="box-image" />
            </div>
            <Link to="/track" className="box-heading">
              Track My Location
            </Link>
            <p className="box-description">
              Use our mobile app to easily track your location on campus
              in real-time. Find the quickest routes to your classes, events,
              and essential facilities with just a few taps.
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

        {/* Carousel Section */}
        <div className="carousel-container">
        <div className="carousel-box">
          <div className="carousel-image-container">
            <img
              src={carouselData[carouselIndex].image}
              alt={`Carousel ${carouselIndex}`}
              className="carousel-image"
            />
          </div>
          <div className="carousel-text">
            <p>{carouselData[carouselIndex].text}</p>
          </div>
        </div>
        <div className="carousel-indicators">
          {carouselData.map((_, index) => (
            <div
              key={index}
              className={`indicator ${carouselIndex === index ? "active" : ""}`}
              onClick={() => handleCarouselChange(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Second Body Section */}
      <div className="body-section-hover">
  <div className="box-row">
    <div className="box">
      <div className="circle-image-container hover-container">
        <img src={campus} alt="Explore Campus" className="box-image hover-image" />
        <div className="hover-overlay">
          <p>Explore Campus</p>
        </div>
      </div>
    </div>
    <div className="box">
      <div className="circle-image-container hover-container">
        <img src={faculty} alt="College Faculty" className="box-image hover-image" />
        <div className="hover-overlay">
          <p>Meet Our Faculty</p>
        </div>
      </div>
    </div>
    <div className="box">
      <div className="circle-image-container hover-container">
        <img src={location} alt="Track my location" className="box-image hover-image" />
        <div className="hover-overlay">
          <p>Track Your Location</p>
        </div>
      </div>
    </div>
    <div className="box">
      <div className="circle-image-container hover-container">
        <img src={event} alt="Events Scheduled" className="box-image hover-image" />
        <div className="hover-overlay">
          <p>Upcoming Events</p>
        </div>
      </div>
    </div>
  </div>
      </div>

    <div className="head">Heading</div>



<div className="full-width-grid">
  {Array.from({ length: 6 }, (_, index) => {
    let content;

    // Assign images to the correct boxes
    if (index === 0) {
      content = <img src={boxim1} alt={`Box ${index + 1}`} />; // 1st row, 1st column
    } else if (index === 3) {
      content = <img src={boxim2} alt={`Box ${index + 1}`} />; // 2nd row, 1st column
    } else if (index === 4) {
      content = <img src={boxim3} alt={`Box ${index + 1}`} />; // 3rd row, 2nd column
    } else {
      content = `Text Box ${index + 1}`; // Other boxes will contain text
    }

    // Apply custom class based on the index and the content
    let className;
    if (content === "Text Box 3") {
      className = "grid-box red";  // Text Box 3 (red background)
    } else if (content === "Text Box 6") {
      className = "grid-box grey"; // Text Box 6 (grey background)
    } else if (index === 1 || index === 4) {
      className = "grid-box grey";  // 1st row, 2nd column and 3rd row, 2nd column (grey)
    } else if (index === 3) {
      className = "grid-box red";   // 2nd row, 1st column (red)
    } else {
      className = "grid-box image"; // Default class for other boxes
    }

    return (
      <div key={index} className={className}>
        {content}
      </div>
    );
  })}
</div>







      <Footer />
    </div>
  );
};

export default Home;
