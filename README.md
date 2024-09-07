# Job Junction

Job Junction is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It serves as a platform to connect local workers (laborers) with customers who need services such as TV mounting, cleaning, plumbing, and more. Workers can register, offer their services, and get booked for jobs in their area. The system also provides a secure way for users to search for and book services.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration & Login**: Both customers and workers can register and log in securely using JWT authentication.
- **Worker Registration**: Workers can create profiles and offer services across different categories and areas.
- **Service Booking**: Customers can search for services based on location and book workers for specific tasks.
- **Secure Authentication**: JWT (JSON Web Tokens) are used to authenticate users and manage secure sessions.
- **Service Categorization**: Tasks are organized into categories (e.g., cleaning, plumbing, electrical work) with workers specializing in different services.
- **Admin Panel**: A centralized admin dashboard to manage users, services, and bookings.
- **Area-Based Search**: Customers can search for available workers in their locality.
- **Real-Time Notifications**: Notify workers of new bookings and users of confirmation statuses.
- **Transaction Management**: Secure handling of service payments, powered by MongoDB transactions.

## Technologies

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS, Bootstrap
- **Version Control**: Git

## Usage

1. **Register**: Users (customers) and workers can sign up and log in.
2. **Book a Service**: After logging in, customers can browse available workers and book a service based on location.
3. **Manage Bookings**: Workers can view and manage incoming service requests from their dashboard.
4. **Admin Dashboard**: Admins can manage users, services, and transactions.

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user (customer/worker)
- **POST** `/api/auth/login` - Login for existing users

### Users
- **GET** `/api/users` - Get all users (Admin only)
- **GET** `/api/users/:id` - Get details of a single user

### Services
- **POST** `/api/services` - Create a new service (Worker only)
- **GET** `/api/services` - Get all available services
- **GET** `/api/services/:id` - Get details of a specific service
- **POST** `/api/bookings` - Book a service (Customer only)

### Admin
- **GET** `/api/admin/requests` - Get all service requests (Admin only)
- **DELETE** `/api/admin/users/:id` - Remove a user (Admin only)

### Booking
- **POST** `/api/bookings` - Create a new service booking
- **GET** `/api/bookings/:id` - Get details of a booking

## Folder Structure
```
Job-Junction/
├── backend/            # Backend (Node.js, Express)
│   ├── config/         # Configuration files (e.g., database connection)
│   ├── controllers/    # Route handler logic
│   ├── models/         # MongoDB Models (User, Service, Booking)
│   ├── routes/         # API routes (auth, users, services, bookings)
│   └── server.js       # Entry point for backend server
├── frontend/           # Frontend (React)
│   ├── src/            # React source code
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Application pages (Login, Register, Home, Admin)
│   │   ├── utils/      # Utility functions (API calls, authentication)
│   │   ├── App.js      # Main application component
│   └── public/         # Static files
└── README.md           # This file
```

## Future Enhancements

- **Reviews and Ratings**: Allow users to rate and review workers after services.
- **Payment Gateway Integration**: Implement a secure payment system for booking services.
- **SMS/Email Notifications**: Notify users and workers about booking confirmations and reminders.
- **Location-Based Suggestions**: Use geolocation to recommend services based on the user's current location.
- **Advanced Filtering**: Add filters for price, service type, worker ratings, etc.
- **Mobile App**: Develop a mobile version of the platform using React Native.

## Contributing

Contributions are welcome! If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

Please ensure all tests pass before submitting your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
