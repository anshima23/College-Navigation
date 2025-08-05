
# College Navigation System
![Project Logo](./src/assets/FixMyRide.png)

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-green.svg)
![Contributors](https://img.shields.io/badge/contributors-5-blue.svg)


## 🚀 Overview

Navigating a large college campus can be a challenge for new students, parents, and faculty members. The College Navigation System is designed to provide seamless indoor and outdoor navigation within the campus. This interactive system includes a 3D model of the campus, real-time navigation features, and faculty directories to enhance the user experience.


---

### 🚀 **Check This Project Live:** 👉 **[https://college-navigation-1.onrender.com/](https://college-navigation-1.onrender.com/)**

---

What makes our project unique?

- 🗺 Interactive Campus Map: Visual representation of all buildings, hostels, sports fields, and key locations.
- 🏢 Indoor Navigation: Navigate inside buildings, find lecture rooms, faculty cabins, and laboratories with ease.
- 📍 Real-Time Navigation: Get turn-by-turn directions to any location on campus.
- 🏫 Detailed Building Information: Learn about each block’s purpose and facilities.
- 👨‍🏫 Faculty Directory: Search for faculty members and locate their offices instantly.
- 🎮 3D Models for Enhanced Visualization: A more immersive and engaging experience.
- 🚀 Smart Search with AI: Use Fuse.js for intelligent search suggestions.

## ✨ Features

- 🗺 Interactive Campus Map – Built using Leaflet.js and Mapbox for smooth navigation.
- 🔄 Indoor Navigation – Find exact rooms and offices within college buildings.
- 🚶‍♂️ Live Routing – Dynamic directions from any location on campus.
- 🏢 3D Campus Model – Provides a realistic visualization of the entire campus.
- 📌 Customizable Markers – Highlight important places like libraries, sports facilities, and hostels.
- 🔍 Smart Search Functionality – Quickly find faculty members, locations, and buildings.
- 📅 Event Integration – Displays college events and important announcements.
- 📱 Mobile-Friendly UI – Works seamlessly on both desktops and mobile devices.

## 🏗 Project Diagram

![Project Architecture](./src/assets/graph1.png)
![Project Architecture](./src/assets/graph2.png)

## 🛠 Installation

```sh
##Backend Setup
# Clone the repository
git clone https://github.com/yourusername/college-navigation.git
cd college-navigation/backend

# Install dependencies
npm install

# Start the server
npm start

##Frontend Setup
cd ../frontend

# Install dependencies
npm install

# Run the Application
npm run dev
```
## ⚙ Configuration
```sh
##Backend Dependencies:
{
  "bcryptjs": "^5.1.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "fuse.js": "^7.0.0",
  "leaflet": "^1.9.4",
  "mongoose": "^8.7.1",
  "socket.io": "^4.8.1",
  "socket.io-client": "^4.8.1"
}

##Frontend Dependencies:
{
  "@react-google-maps/api": "^2.20.3",
  "axios": "^1.7.7",
  "dijkstrajs": "^1.0.3",
  "fuse.js": "^7.0.0",
  "leaflet": "^1.9.4",
  "leaflet-control-geocoder": "^2.4.0",
  "leaflet-routing-machine": "^3.2.12",
  "mapbox-gl": "^3.7.0",
  "react": "^18.3.1",
  "react-leaflet": "^4.2.1",
  "react-router-dom": "^6.26.2"
}
```

## 📚  Learning Goals
This project provides hands-on experience in:

- Implementing interactive maps with Leaflet.js and Mapbox.
- Developing real-time navigation systems using Dijkstra's algorithm for shortest - path calculations.
- Creating 3D models of buildings for immersive visualization.
- Building a faculty search and directory system using Fuse.js for fuzzy search.
- Working with backend APIs to handle search queries, routes, and user authentication.

## 🎯 Issues & Limitations
🚧 Indoor Positioning Accuracy – Indoor navigation requires precise floor mapping, which can be challenging.

🚧 Real-Time Data Updates – Keeping building layouts and faculty locations up to date is an ongoing challenge.

🚧 Mobile Performance – Rendering 3D models on low-end mobile devices can be slow.

## 🤝 Contributor Guidelines

- Contributors are welcome! Please follow these guidelines:
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to your branch (git push origin feature-branch).
- Create a new Pull Request.

## 🤝 Acknowledgments

We would like to express our gratitude to:

- OpenStreetMap & Google Maps – For providing mapping data.
-React & Tailwind CSS Community – For powerful UI development tools.
- GSAP & Three.js – For enabling 3D model animations.
- Early Testers & Users – For valuable feedback in improving the system.

## 💰 Donation

 If you find this project useful and would like to support its further development, feel free to donate via PayPal:

Donate via PayPal

## 📩 Contact

For queries or contributions, contact: [anshima541@gmail.com](mailto:anshima541@gmail.com)
