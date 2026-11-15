# Bhala – Full-Stack E-commerce Application

Bhala is a full-stack e-commerce web application built to provide users with a convenient online shopping experience. It features product browsing, search and filtering, shopping cart functionality, and product management through an administrative interface.

The application uses a React frontend connected to a Node.js REST API, with Sequelize handling database operations and relationships.

**Live Demo:** [Visit Bhala](https://e-commerce-frontend-magq.onrender.com/)

**Backend API:** [Bhala API](https://api-starter-app-1.onrender.com/)

---

## Features

### Customer Features
- Browse products and product categories.
- Browse products by brand and subcategory.
- Search for products.
- Filter products by category, brand, and size.
- Sort products by latest, rating, and best-selling.
- View individual product details.
- View product images, available sizes, and colours.
- Add products to a shopping cart.
- Update and manage shopping cart items.
- Submit and view product reviews.
- Navigate through products using pagination.

### Admin Features
- Manage products.
- Create and update product information.
- Upload and manage product images.
- Manage product categories and subcategories.
- Manage brands, colours, and sizes.
- Manage product availability and stock.
- View products with search and pagination.
- Protected administrative routes with role-based access control.

---

## Technology Stack

### Frontend
- React.js
- JavaScript
- React Router
- HTML5
- CSS3 / SCSS
- Bootstrap
- Fetch API / Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- RESTful API architecture
- Bearer token authentication
- Role-based authorization

### Database
- Relational database managed through Sequelize ORM.

---

## Application Architecture

Bhala follows a client-server architecture, separating the frontend from the backend API.

```text
              React Frontend
                    |
                    |
                REST API
                    |
              Node.js / Express
                    |
                    |
               Sequelize ORM
                    |
                    |
                 Database
```

The frontend communicates with the backend through HTTP requests. The backend handles business logic, authentication, authorization, and database operations.

---

## Project Structure

The project is organized into separate frontend and backend applications.

```text
Bhala/
│
├── api/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── migrations/
│   ├── package.json
│   └── server.js
│
└── react-frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- A configured relational database
- Git

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd Bhala
```

### 2. Set up the backend

```bash
cd api
npm install
```

Create a `.env` file in the API directory and configure your database connection, authentication secrets, and other required environment variables.

Start the backend development server:

```bash
npm run dev
```

The API runs on your configured local port.

### 3. Set up the frontend

Open another terminal:

```bash
cd react-frontend
npm install
```

Configure the frontend API URL in your `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at the local Vite development URL.

---

## Authentication and Security

The backend implements authentication and authorization to protect application resources.

- Bearer token authentication.
- Protected API endpoints.
- Role-based access control.
- Middleware for authentication and authorization.
- Separate access permissions for administrative and customer functionality.

---

## Deployment

The application is deployed using Render, with the frontend and backend hosted as separate services.

- **Frontend:** https://e-commerce-frontend-magq.onrender.com/
- **Backend:** https://api-starter-app-1.onrender.com/

The frontend communicates with the deployed backend using an environment-based API URL configuration.

---

## Future Improvements

Potential improvements and planned enhancements include:

- Payment gateway integration.
- Order management and order tracking.
- Improved checkout experience.
- Email notifications.
- Additional performance optimizations.
- Automated testing.

---

## Author

Developed as a full-stack development project to demonstrate practical experience building and deploying a modern e-commerce application using React, Node.js, Express, and Sequelize.

