// src/pages/CampusMap.jsx
import React from 'react';
import collegeImage from '../../assets/collegeim.jpeg';
import { Link } from 'react-router-dom';
import './CampusMap.css'; // Ensure to import the CSS
import Footer from '../../Components/Footer/footer';

const CampusMap = () => {
  return (
    <div> 
      <div className="hero-container">
        <img 
          src={collegeImage} 
          alt="College" 
          className="college-image" 
        />
      </div>
      <div className="body-section">
        {/* First Row */}
        <div className="box-row">
          <div className="box">
            <img src={collegeImage} alt="Administrative Block" className="block-image" />
            <h3 className="box-heading">Administrative Block</h3>
            <p className="box-description">This block houses the administrative offices and services.</p>
            <button className='btn'>
              <Link to="/block/adminblock" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="EN / EC Block" className="block-image" />
            <h3 className="box-heading">EN / EC Block</h3>
            <p className="box-description">This block is dedicated to Electronics and Communication Engineering.</p>
            <button className='btn'>
              <Link to="/block/en-ec-block" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="Seminar Halls" className="block-image" />
            <h3 className="box-heading">Seminar Halls</h3>
            <p className="box-description">Equipped with modern facilities for seminars and workshops.</p>
            <button className='btn'>
              <Link to="/block/seminar-halls" className="details-button">View Details</Link>
            </button>
          </div>
        </div>

        {/* Second Row */}
        <div className="box-row">
          <div className="box">
            <img src={collegeImage} alt="Lecture Rooms & Tutorials" className="block-image" />
            <h3 className="box-heading">Lecture Rooms & Tutorials</h3>
            <p className="box-description">Designed for interactive learning and tutorials.</p>
            <button className='btn'>
              <Link to="/block/lecture-rooms" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="Computer Center" className="block-image" />
            <h3 className="box-heading">Computer Center</h3>
            <p className="box-description">A state-of-the-art facility for computer science students.</p>
            <button className='btn'>
              <Link to="/block/computer-center" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="CS / IT Block" className="block-image" />
            <h3 className="box-heading">CS / IT Block</h3>
            <p className="box-description">Dedicated to Computer Science and Information Technology.</p>
            <button className='btn'>
              <Link to="/block/cs-it-block" className="details-button">View Details</Link>
            </button>
          </div>
        </div>

        {/* Third Row */}
        <div className="box-row">
          <div className="box">
            <img src={collegeImage} alt="Mechanical Block" className="block-image" />
            <h3 className="box-heading">Mechanical Block</h3>
            <p className="box-description">Home to the Mechanical Engineering department and labs.</p>
            <button className='btn'>
              <Link to="/block/mechanical-block" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="Lecture Theatre Complex" className="block-image" />
            <h3 className="box-heading">Lecture Theatre Complex</h3>
            <p className="box-description">A large auditorium for lectures and presentations.</p>
            <button className='btn'>
              <Link to="/block/lecture-theatre-complex" className="details-button">View Details</Link>
            </button>
          </div>
          <div className="box">
            <img src={collegeImage} alt="Sports Ground" className="block-image" />
            <h3 className="box-heading">Sports Ground</h3>
            <p className="box-description">Facilities for various sports and physical activities.</p>
            <button className='btn'>
              <Link to="/block/sports-ground" className="details-button">View Details</Link>
            </button>
          </div>
        </div>

        {/* Fourth Row */}
        <div className="box-row">
          <div className="box">
            <img src={collegeImage} alt="Girls Hostel" className="block-image" />
            <h3 className="box-heading">Girls Hostel</h3>
            <p className="box-description">Comfortable accommodation for female students.</p>
            <button className='btn'>
              <Link to="/block/girls-hostel" className="details-button">View Details</Link>
            </button>
          </div>

          {/* Boys Hostel */}
          <div className="box">
            <img src={collegeImage} alt="Boys Hostel" className="block-image"/>
             <h3  classNmae= "box-heading">Boys Hostel</h3> 
             <p  classNmae= "box-description">Comfortable accommodation for male students.</p>  
             <button  classNmae= 'btn'>  
             <Link  to="/block/boys-hostel"  classNmae= "details-button">View Details</Link>  
             </button>  
            </div>  
          </div>  
        </div>  
       <Footer/>  
      </div>  
   );  
};   

export default CampusMap; 