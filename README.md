# Blogify – Frontend

Blogify is a full-stack blogging platform. This repository contains the **React + Tailwind CSS frontend**, which provides a responsive user interface for creating, viewing, and managing blog posts. It communicates with the backend API to handle authentication, posts, comments, and administrative actions.

👉 The backend service (Spring Boot + PostgreSQL) can be found here: [Blogify Backend Repository](https://github.com/Kotik112/blog-backend)

## ✨ Features

- **Public Pages**
    - Home page with recent posts
    - About Us & Contact pages
    - Leave comments on posts

- **Authentication**
    - User registration and login
    - Session-based authentication with Spring Security backend
    - Conditional navigation (login/logout links)

- **User Functionality**
    - Create new blog posts
    - View and manage your own posts
    - Upload images with posts
    - Leave and view comments
  
- **Admin Dashboard**
    - Access restricted to users with the `ADMIN` role
    - Manage users (view, update roles, delete accounts)
    - Manage posts (view, delete, audit)

## Test it live
https://blogify.kitok.click/

## 🛠 Tech Stack

**Frontend**
- [React](https://react.dev/) – component-based UI library
- [React Router](https://reactrouter.com/) – client-side routing
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework for styling
- React Context API – global state for authentication
- Fetch API – communication with the backend API

**Backend**
- [Spring Boot](https://spring.io/projects/spring-boot) – REST API provider
- [Spring Security](https://spring.io/projects/spring-security) – authentication and authorization
- [PostgreSQL](https://www.postgresql.org/) – relational database
- [Flyway](https://flywaydb.org/) – database migrations

👉 See the backend repo for details: [Blogify Backend](https://github.com/Kotik112/blog-backend)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn package manager
- A running instance of the [Blogify Backend](https://github.com/Kotik112/blog-backend)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/blogify-frontend.git
cd blogify-frontend
```

### 2. Install dependencies
```bash
npm install
```
or
```bash
yarn install
```

### 3. Configure environment
Create a .env file in the root directory and define the backend API base URL:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Run the development server
```bash
npm run dev
```

The app will be available at http://localhost:5173
by default.
