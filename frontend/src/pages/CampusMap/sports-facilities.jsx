import React from "react";
import "./sports-facilities.css"; // Optional for CSS styling
import spo1 from "../../assets/spo1.jpg";
import spo2 from "../../assets/spo2.jpg";
import spo3 from "../../assets/spo3.jpg";
import Footer from "../../Components/Footer/footer";

const SportsFacilities = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* Top Image */}
        <div className="top-image-container">
          <img src={spo1} alt="Sports Facilities" className="top-image" />
          <div className="overlay-text">
            COLLEGE LIFE
            <p>vibrant, inclusive & fun</p>
          </div>
        </div>
        {/* Blue Background Section */}
        <div className="blue-section">
          {/* First Row */}
          <div className="row">
            <div className="image-container">
              <img src={spo2} alt="Facility 1" className="row-image" />
            </div>
            <div className="text-container">
              <h2 className="box-h">State-of-the-Art Gym</h2>
              <p>
                Our gym is equipped with the latest equipment to help students
                maintain fitness and health. It offers an inclusive environment
                for everyone to stay active.
              </p>
              <button>working</button>
            </div>
          </div>

          {/* Second Row */}
          <div className="row">
            <div className="text-container">
              <h2>Olympic-Size Swimming Pool</h2>
              <p>
                Dive into our Olympic-size swimming pool, designed for both
                recreational and professional training. It’s a perfect spot for
                relaxation and fitness.
              </p>
              <button>working</button>
            </div>
            <div className="image-container">
              <img src={spo3} alt="Facility 2" className="row-image" />
            </div>
          </div>

          <div className="row">
            <div className="image-container">
              <img src={spo2} alt="Facility 1" className="row-image" />
            </div>
            <div className="text-container">
              <h2 className="box-h">State-of-the-Art Gym</h2>
              <p>
                Our gym is equipped with the latest equipment to help students
                maintain fitness and health. It offers an inclusive environment
                for everyone to stay active.
              </p>
              <button>working</button>
            </div>
          </div>
        </div>{" "}
        {/* Closing the blue-section div */}
        <div className="full-width-cards">
          {[...Array(5)].map((_, index) => (
            <div className="card" key={index}>
              {/* Card Image */}
              <div className="card-image">
                <img src={spo2} alt={`Card ${index + 1}`} />
              </div>
              {/* Card Content */}
              <div className="card-content">
                <h3>Card Title {index + 1}</h3>
                <p>
                  This is card content for card . Add any relevant
                  information or description here. This is card content for card . Add any relevant
                  information or description here. This is card content for card . Add any relevant
                  information or description here.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SportsFacilities;
