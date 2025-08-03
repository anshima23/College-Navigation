import React, { useState, useEffect } from "react";
import "./Faculty.css";
import director from "../../assets/director-1.jpg";
import General from "../../assets/Director_AKGEC.jpg";

const Faculty = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Computer Science and Engineering"
  );
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
         `https://college-navigation-1.onrender.com/api/faculty/department/${encodeURIComponent(selectedDepartment)}`
        );

        if (!response.ok) throw new Error("Failed to fetch faculty data");

        const data = await response.json();
        setFacultyList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [selectedDepartment]);

  const departments = [
    "Computer Science",
    "Mathematics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical and Electronics Engineering",
    "Computer Science and Engineering",
    "Information Technology",
    "Master of Computer Applications",
  ];

  return (
    <div className="faculty-page">
      <div className="directors-section">
        <div className="director-circle">
          <img src={General} alt="Director" className="circle-image" />
          <h3>Dr. Hemant Ahuja</h3>
        </div>
        <div className="director-circle">
          <img src={director} alt="Director General" className="circle-image" />
          <h3>Dr R.K. Agarwal</h3>
        </div>
      </div>

      <div className="department-heading-bar">
        {departments.map((department, index) => (
          <button
            key={index}
            className={`department-button ${
              selectedDepartment === department ? "active" : ""
            }`}
            onClick={() => setSelectedDepartment(department)}
          >
            {department}
          </button>
        ))}
      </div>

      <div className="faculty-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : facultyList.length ? (
          <div>
            <h2>{selectedDepartment} Faculty</h2>
            <div className="faculty-cards">
              {facultyList.map((faculty, index) => (
                <div key={index} className="faculty-card">
                  <img
                    src={
                      faculty.imageUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPnb_I_OQt7Mcts15Kf9qwVchNCE7SJlkfYQ&s"
                    }
                    alt="Faculty"
                    className="faculty-image"
                  />
                  <div className="faculty-info">
                    <strong>{faculty.name}</strong>
                    <p><strong>Post:</strong> {faculty.post}</p>
                    <p><strong>Email:</strong> {faculty.email}</p>
                    <p><strong>Phone:</strong> {faculty.phone}</p>
                    <p><strong>Qualification:</strong> {faculty.qualification}</p>
                    <p><strong>Degree:</strong> {faculty.degree}</p>
                    <p><strong>Experience:</strong> {faculty.experience}</p>
                    <p>{faculty.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h3>No faculty members found for {selectedDepartment}.</h3>
        )}
      </div>
    </div>
  );
};

export default Faculty;
