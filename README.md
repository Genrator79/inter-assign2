# Dish App

**Live Demo:** [https://inter-assign2.vercel.app/](https://inter-assign2.vercel.app/)

A full-stack application for managing and displaying dishes with real-time updates.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io
- **Frontend**: React, Vite, Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
- **MongoDB**: Ensure you have a MongoDB instance running or a connection string.

## Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd intern-assign2
    ```

2.  **Backend Setup**

    Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following content:

    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

    *Note: Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual credentials.*

3.  **Frontend Setup**

    Navigate to the frontend directory and install dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1.  **Start the Backend Server**

    In the `backend` directory:

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:5001`.

2.  **Start the Frontend Development Server**

    In the `frontend` directory:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## API Endpoints

-   `GET /api/dishes`: Fetch all dishes
-   `POST /api/dishes/toggle/:id`: Toggle the published status of a dish (requires authentication)

## Real-time Updates

The application uses Socket.io to provide real-time updates when a dish's status is changed.
