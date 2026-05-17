# Finance Tracker Technology Stack

This document outlines the core technologies and tools used to build the Finance Tracker application.

## Overall Architecture
The application uses the **MERN** stack (MongoDB, Express, React, Node.js), which is a popular full-stack javascript framework for building dynamic web applications.

---

## Frontend (Client-Side)
The frontend is built for speed, responsiveness, and premium aesthetics.

* **React.js**: The core library used for building the user interface via reusable components.
* **Vite**: A fast build tool and development server, chosen over Create React App for significantly faster hot-module replacement and optimized builds.
* **React Router DOM**: Handles client-side routing, enabling navigation between the Login, Register, Dashboard, Income, and Expenses pages without reloading the browser.
* **React Context API**: Used for global state management (specifically for Authentication and Transaction data) instead of heavier libraries like Redux.
* **Axios**: A promise-based HTTP client used to make API requests to the backend.
* **Recharts**: A composable charting library built on React components used for the interactive Dashboard visualizations (Donut & Bar charts).
* **Lucide React**: Provides the beautiful, consistent SVG icons used in the sidebar navigation.
* **Vanilla CSS**: Used for all styling. Features modern design concepts including CSS Variables, Flexbox/Grid layouts, Glassmorphism, and micro-animations to achieve a premium look without relying on heavy frameworks like Bootstrap or Tailwind.

---

## Backend (Server-Side)
The backend provides a secure, RESTful API.

* **Node.js**: The runtime environment for executing JavaScript code server-side.
* **Express.js**: A minimal and flexible Node.js web application framework that provides robust features for building the API endpoints.
* **MongoDB**: A NoSQL document database used to store Users and their associated Transactions.
* **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and their representation in MongoDB.
* **JSON Web Tokens (JWT)**: Used for secure, stateless user authentication and protecting private routes.
* **Bcrypt.js**: A password-hashing function used to securely hash user passwords before storing them in the database.
* **Cors**: Express middleware used to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend.
* **Dotenv**: Module that loads environment variables from a `.env` file into `process.env`.
* **Nodemon**: A utility that monitors for any changes in the source code and automatically restarts the server during development.
