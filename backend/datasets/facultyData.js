// backend/datasets/facultyData.js

const mongoose = require('mongoose');
const Faculty = require('../models/faculty.model'); // Adjust the path if necessary

// Sample faculty data
const facultyMembers = [
    {
        name: "John Doe",
        department: "Computer Science",
        email: "john.doe@example.com",
        phone: "+1234567890"
    },
    {
        name: "Jane Smith",
        department: "Mathematics",
        email: "jane.smith@example.com",
        phone: "+0987654321"
    },
    {
        name: "Alice Johnson",
        department: "Physics",
        email: "alice.johnson@example.com",
        phone: "+1122334455"
    },
    {
        name: "Bob Brown",
        department: "Chemistry",
        email: "bob.brown@example.com",
        phone: "+2233445566"
    },
    {
        name: "Emily Davis",
        department: "Biology",
        email: "emily.davis@example.com",
        phone: "+3344556677"
    }
];

// Connect to MongoDB and insert data
const insertFacultyData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');

        // Insert data
        await Faculty.insertMany(facultyMembers);
        
        console.log('Faculty data inserted successfully');
    } catch (error) {
        console.error('Error inserting faculty data:', error.message);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Run the function to insert data
insertFacultyData();