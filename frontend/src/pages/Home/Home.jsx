import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import im1 from "../../assets/im1.png";
import im2 from "../../assets/im2.webp";
import im3 from "../../assets/im3.png";
import acad from "../../assets/acad.jpg";
import eventt from "../../assets/eventt.jpg";
import campus from "../../assets/campus.jpg";
import one from "../../assets/one.jpg";
import two from "../../assets/two.jpg";
import three from "../../assets/three.jpg";
import four from "../../assets/four.jpg";
import fac from "../../assets/fac.jpg";
import even from "../../assets/even.jpg";
import loc from "../../assets/loc.jpg";
import boxim1 from "../../assets/boxim1.jpg";
import boxim2 from "../../assets/boxim2.jpg";
import boxim3 from "../../assets/boxim3.jpg";
import faculty from "../../assets/faculty.png";
import location from "../../assets/location.png";
import event from "../../assets/event.png";
import Footer from "../../Components/Footer/footer";
import "./home.css";

const Home = () => {
  const heroImages = [im1, im2, im3];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Carousel Section Data
  const carouselData = [
    { image: acad, text: "Academic Excellence Unveiled" },
    { image: eventt, text: "Engaging Events Await" },
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Text Animation for Hero Section
  const textSequence = [
    "Navigate campus seamlessly",
    "Discover faculty and facilities",
  ];
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hero Section Image Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3300);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Typing Effect for Hero Section
  useEffect(() => {
    const handleTyping = () => {
      const currentSentence = textSequence[textIndex];
      if (!isDeleting) {
        setCurrentText((prev) => currentSentence.substring(0, prev.length + 1));
        if (currentText === currentSentence) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setCurrentText((prev) => currentSentence.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textSequence.length);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, 100);

    return () => clearInterval(typingInterval);
  }, [currentText, isDeleting, textSequence, textIndex]);

  // Carousel Section Change
  const handleCarouselChange = (index) => {
    setCarouselIndex(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-container">
        <img
          src={heroImages[currentHeroIndex]}
          alt={`Slide ${currentHeroIndex + 1}`}
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
              Discover our vibrant campus, where state-of-the-art facilities and
              lush green spaces await you. Explore the campus map to find
              libraries, labs, and recreational areas.
            </p>
          </div>
          <div className="box">
            <div className="circle-image-container">
              <img src={fac} alt="College Faculty" className="box-image" />
            </div>
            <Link to="/college-faculty" className="box-heading">
              Faculty
            </Link>
            <p className="box-description">
              Meet our dedicated faculty members who bring years of expertise
              and passion to the classroom. They are committed to providing you
              with a rich and rewarding academic experience.
            </p>
          </div>
          <div className="box">
            <div className="circle-image-container">
              <img src={loc} alt="Track my location" className="box-image" />
            </div>
            <Link to="/track" className="box-heading">
              Track My Location
            </Link>
            <p className="box-description">
              Use our mobile app to easily track your location on campus in
              real-time, ensuring you never miss a class or event again.
            </p>
          </div>
          <div className="box">
            <div className="circle-image-container">
              <img src={even} alt="Events Scheduled" className="box-image" />
            </div>
            <Link to="/events-scheduled" className="box-heading">
              Event Scheduled
            </Link>
            <p className="box-description">
              Stay up to date with all the exciting events happening on campus.
              From workshops to cultural fests, never miss out on the action.
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
              <img
                src={one}
                alt="Explore Campus"
                className="box-image hover-image"
              />
              <div className="hover-overlay">
                <p>
                  Our college emphasizes academic excellence with a focus on
                  innovative teaching methods. We offer diverse programs that
                  cater to various fields of study, ensuring a comprehensive
                  education. Our experienced faculty and modern facilities help
                  students achieve their academic and professional goals.
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="circle-image-container hover-container">
              <img
                src={two}
                alt="College Faculty"
                className="box-image hover-image"
              />
              <div className="hover-overlay">
                <p>
                  Our college promotes a strong sports culture, offering a wide
                  range of activities for all skill levels. With
                  state-of-the-art facilities and dedicated coaching, students
                  have the opportunity to excel in various sports. We actively
                  participate in regional and national tournaments, fostering
                  teamwork and discipline.
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="circle-image-container hover-container">
              <img
                src={three}
                alt="Track my location"
                className="box-image hover-image"
              />
              <div className="hover-overlay">
                <p>
                  Our college has consistently ranked among the top institutions
                  in the region, with numerous awards in academic and
                  extracurricular fields. We take pride in our students'
                  achievements in national competitions, sports, and research.
                  Our alumni have made notable contributions in various
                  industries globally, reflecting the college's legacy of
                  excellence.
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="circle-image-container hover-container">
              <img
                src={four}
                alt="Events Scheduled"
                className="box-image hover-image"
              />
              <div className="hover-overlay">
                <p>
                  The college offers a rigorous academic curriculum designed to
                  provide a strong foundation in both theory and practical
                  knowledge. Students are encouraged to engage in research,
                  internships, and projects to enhance their learning
                  experience. Our dedicated faculty members ensure personalized
                  attention to help students achieve their academic goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Full-Width Grid Section */}
<div className="full-width-grid">
  {Array.from({ length: 6 }, (_, index) => {
    let content;
    let heading;
    
    // Define content and heading for the non-image boxes
    if (index === 0) {
      content = <img src={boxim1} alt={`Box ${index + 1}`} />;
    } else if (index === 3) {
      content = <img src={boxim2} alt={`Box ${index + 1}`} />;
    } else if (index === 4) {
      content = <img src={boxim3} alt={`Box ${index + 1}`} />;
    } else {
      heading = `Heading for Text Box ${index + 1}`;
      content = `Content for Text Box ${index + 1}`;
    }

    let className;
    // Assign specific styles based on the content type
    if (content === "Content for Text Box 3") className = "grid-box red";
    else if (content === "Content for Text Box 6") className = "grid-box grey";
    else if (index === 1 || index === 4) className = "grid-box grey";
    else if (index === 3) className = "grid-box red";
    else className = "grid-box image";

    return (
      <div key={index} className={className}>
        {/* Render heading and content only for text boxes */}
        {heading && (
          <>
            <h3>{heading}</h3>
            <p>{content}</p>
          </>
        )}
        {/* Render image for image boxes */}
        {!heading && content}
      </div>
    );
  })}
</div>


      <Footer />
    </div>
  );
};

export default Home;
