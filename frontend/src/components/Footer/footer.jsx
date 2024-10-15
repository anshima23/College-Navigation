import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import locationIcon from "../../assets/locat.png";
import call from "../../assets/call.png";
import email from "../../assets/email.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
            <div className="footer-group"> 
                    <div className="contact-item">
                        <img src={locationIcon} alt="Location Icon" className="icon" />
                        <p>27th Km Milestone,</p>
                    </div>
                    <p>Delhi-Meerut Expressway,</p>
                    <p>P.O. Adhyatmik Nagar,</p>
                    <p>Ghaziabad - 201015</p>
                    <div className="contact-item">
                        <img src={call} alt="Call Icon" className="icon" />
                        <p>8744052891-93</p>
                    </div>
                    <p>Admissions Enquiry: 1800-200-0777</p>
                    <div className="contact-item">
                        <img src={email} alt="Call Icon" className="icon" />
                        <p>Email: info@akgec.ac.in</p>
                    </div>
                </div>
                <div className="footer-group">
                    <h3>Quick Links:</h3>
                    <ul>
                        <li><a href="#">AKGIM-MBA Admission</a></li>
                        <li><a href="#">AKGIM-MBA</a></li>
                        <li><a href="#">AICTE Approval Letters</a></li>
                        <li><a href="#">NIRF Data for Ranking 2024</a></li>
                        <li><a href="#">Mandatory Disclosure</a></li>
                        <li><a href="#">Open Educational Resources (OER)</a></li>
                        <li><a href="#">Online Reporting of Ragging Cases</a></li>
                        <li><a href="#">Fee Fixation Letter</a></li>
                        <li><a href="#">Grievance Committee</a></li>
                        <li><a href="#">Internal Complaints Committee</a></li>
                    </ul>
                </div>
                <div className="footer-group">
                    <h3>About AKGEC:</h3>
                    <p>Ajay Kumar Garg Engineering College (AKGEC) offers a four-year undergraduate B.Tech course in all major engineering branches.</p>
                    <p>We also provide a two-year postgraduate M.Tech course in four engineering branches and a two-year postgraduate MCA course.</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Ajay Kumar Garg Engineering College. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;/* src/Footer.css */