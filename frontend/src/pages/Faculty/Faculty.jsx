import React, { useState } from 'react';
import './Faculty.css';

const Faculty = () => {
  // Initialize with "Computer Science" to show it by default
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science and Engineering');

  // Sample department data with faculty members
  const departments = {
    'Applied Science & Humanities': [
      { name: 'Dr. John Doe', title: 'Professor' },
      { name: 'Dr. Jane Smith', title: 'Associate Professor' },
      { name: 'Dr. Alice Johnson', title: 'Assistant Professor' },
      { name: 'Dr. Bob Brown', title: 'Senior Lecturer' },
    ],
    'Electronics and Communication Engineering': [
      { name: 'Dr. John Doe', title: 'Professor' },
      { name: 'Dr. Jane Smith', title: 'Associate Professor' },
      { name: 'Dr. Alice Johnson', title: 'Assistant Professor' },
      { name: 'Dr. Bob Brown', title: 'Senior Lecturer' },
    ],
    'Mechanical Engineering': [
      { name: 'Dr. John Doe', title: 'Professor' },
      { name: 'Dr. Jane Smith', title: 'Associate Professor' },
      { name: 'Dr. Alice Johnson', title: 'Assistant Professor' },
      { name: 'Dr. Bob Brown', title: 'Senior Lecturer' },
    ],
    'Civil Engineering': [
      { name: 'Dr. Alan Turing', title: 'Professor' },
      { name: 'Dr. Marie Curie', title: 'Assistant Professor' },
    ],
    'Electrical and Electronics Engineering': [
      { name: 'Dr. Nikola Tesla', title: 'Professor' },
      { name: 'Dr. Elon Musk', title: 'Lecturer' },
    ],
    'Computer Science and Engineering': [
      { name: 'Dr. Gustave Eiffel', title: 'Professor' },
      { name: 'Dr. I. M. Pei', title: 'Lecturer' },
    ],
    'Information Technology': [
      { name: 'Dr. Gustave Eiffel', title: 'Professor' },
      { name: 'Dr. I. M. Pei', title: 'Lecturer' },
    ],
    'Master of Computer Applications': [
      { name: 'Dr. Gustave Eiffel', title: 'Professor' },
      { name: 'Dr. I. M. Pei', title: 'Lecturer' },
    ],
    // Add more departments as needed
  };

  // Handle department click
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="faculty-page">
      {/* Department Heading Bar */}
      <div className="department-heading-bar">
        {Object.keys(departments).map((department, index) => (
          <button
            key={index}
            className={`department-button ${
              selectedDepartment === department ? 'active' : ''
            }`}
            onClick={() => handleDepartmentClick(department)}
          >
            {department}
          </button>
        ))}
      </div>

      {/* Faculty List Section */}
      <div className="faculty-list">
        {selectedDepartment ? (
          <div>
            <h2>{selectedDepartment} Faculty</h2>
            <div className="faculty-cards">
              {departments[selectedDepartment].map((faculty, index) => (
                <div key={index} className="faculty-card">
                  <img
                    src={`https://via.placeholder.com/80?text=Image`} // Replace with actual image if available
                    alt="Faculty"
                    className="faculty-image"
                  />
                  <div className="faculty-info">
                    <strong>{faculty.name}</strong>
                    <p>{faculty.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h3>Please select a department to view faculty members.</h3>
        )}
      </div>
    </div>
  );
};

export default Faculty;
