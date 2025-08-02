import React, { useState, useEffect } from "react";
import "./Faculty.css";
import campusim from "../../assets/college-map-im1.avif";

const Faculty = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Computer Science and Engineering"
  );
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch faculty data based on the selected department
  useEffect(() => {
    const fetchFacultyData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

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
        setLoading(false); // End loading
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
          <img
            src={campusim} // Replace with actual image URL
            alt="Director"
            className="circle-image"
          />
          <h3>Director Name</h3>
        </div>
        <div className="director-circle">
          <img
            src={campusim} // Replace with actual image URL
            alt="Director General"
            className="circle-image"
          />
          <h3>Director General Name</h3>
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
        {loading ? ( // Show loading state
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
                      "https://via.placeholder.com/80?text=Image"
                    }
                    alt="Faculty"
                    className="faculty-image"
                  />
                  <div className="faculty-info">
                    <strong>{faculty.name}</strong>
                    <p>{faculty.title}</p>
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
