import React from "react";
import "./sports-facilities.css"; // Optional for CSS styling
import spo1 from "../../assets/spo1.jpg";
import spo2 from "../../assets/spo2.jpg";
import spo3 from "../../assets/spo3.jpg";
import Footer from "../../Components/Footer/footer";

const SportsFacilities = () => {
  return (
    <div>
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
      </div> {/* Closing the blue-section div */}

      {/* New Full-Width Section */}
      <div className="full-width-section">
        <div className="half-section">
          <div className="content-section">
            <h2>Engaging Activities</h2>
            <p>
              Participate in engaging activities ranging from cultural events to
              tech fests, promoting creativity and teamwork among students.
            </p>
          </div>
          <div className="image-section">
            <img src={spo2} alt="Activity Image" className="activity-image" />
          </div>
        </div>
        <div className="half-section">
          <div className="image-section">
            <img src={spo3} alt="Activity Image" className="activity-image" />
          </div>
          <div className="content-section">
            <h2>Recreational Facilities</h2>
            <p>
              Enjoy access to recreational facilities that help you unwind and
              recharge, including game zones, music rooms, and lounges.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SportsFacilities;
