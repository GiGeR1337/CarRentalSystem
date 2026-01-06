# Car Rental System

A full-stack web application designed to simplify the vehicle rental process. This system enables users to browse the available fleet, book cars for specific dates, and manage their reservations. Administrators have access to a dashboard to manage vehicles, users, and rental locations.

The application features a responsive user interface, supports multiple languages (English and Polish), and uses JWT (JSON Web Tokens) for secure authentication.

## Tech Stack

### Backend
- **Java 23**
- **Spring Boot 3** (Web, Data JPA, Security, Validation)
- **MySQL 8** (Database)
- **Hibernate** (ORM)
- **JWT** (Authentication & Authorization)
- **Docker & Docker Compose** (Containerization)

### Frontend
- **React.js** (Vite)
- **React Router** (Navigation)
- **Axios** (API communication)
- **i18next** (Internationalization - EN/PL)
- **React-Toastify** (Notifications)
- **CSS3** (Custom styling with CSS variables)

---

## Features

### User Panel
- **Authentication:** Secure registration and login using JWT.
- **Browse Fleet:** View a searchable list of cars with details like brand, model, year, price, and location.
- **Rent a Car:** Select dates to calculate costs and book vehicles.
- **My Rentals:** View booking history and current reservation status.
- **Manage Reservations:** Update dates or cancel active bookings.

### Admin Panel
- **Dashboard:** Overview of system statistics (Users, Cars, Locations).
- **Fleet Management:** Add, edit, and remove vehicles.
- **User Management:** View registered users and delete accounts.
- **Location Management:** Create and manage rental hubs.

---

## Configuration

This project relies on environment variables for database credentials and security keys.

1. Create a file named `.env` in the root directory (next to `docker-compose.yml`).
2. Add the following configuration variables to the file:

```env
# Database Configuration
DB_USER=root
DB_PASSWORD=root
DB_URL=jdbc:mysql://db:3306/car_rental_db?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false

# Security Configuration
JWT_SECRET=replace_this_with_a_very_secure_secret_key
JWT_EXPIRATION=86400000
```

---

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GiGeR1337/CarRental.git
    ```

2.  **Build and Run:**
    Open your terminal in the project root folder (where `docker-compose.yml` is located) and run:
    ```bash
    docker-compose up --build
    ```

3.  **Access the Application:**
    * **Frontend (App):** [http://localhost:5173](http://localhost:5173)
    * **Backend (API):** [http://localhost:8080](http://localhost:8080)

---
  
## Default Credentials

The system initializes with sample data defined in `data.sql`. You can use the following accounts to test the application:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `admin123` |
| **User** | `john.doe@example.com` | `admin123` |

--- 

## API Endpoints Overview

The backend exposes a RESTful API. Here are some of the key endpoints:

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user and receive a JWT token | Public |
| `POST` | `/api/users/register` | Register a new user account | Public |
| `GET` | `/api/cars/all` | Retrieve a list of all vehicles | Public |
| `POST` | `/api/rentals` | Create a new rental reservation | User/Admin |
| `GET` | `/api/rentals/my-history` | Get rental history for the logged-in user | User/Admin |
| `POST` | `/api/cars/create` | Add a new car to the database | Admin |
| `DELETE` | `/api/users/delete/{id}`| Remove a user from the system | Admin |
