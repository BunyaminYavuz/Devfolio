# Project Name

## Description

This project is a full-stack web application built using React for the frontend and Node.js with Express for the backend. It serves as a personal portfolio and project management tool, showcasing the developer's skills and projects. The application includes features for displaying projects, managing categories, and providing an admin interface for managing content.

## Features

- User-friendly interface for viewing and filtering projects.
- Admin panel for managing projects and categories.
- Contact form for users to send messages.
- Dashboard with statistics and activity logs.

## Technologies Used

- **Frontend**: 
  - React
  - Styled-components
  - React Router
  - Axios

- **Backend**: 
  - Node.js
  - Express
  - MongoDB (with Mongoose)
  - dotenv

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or use a cloud service like MongoDB Atlas.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your environment variables:
   ```plaintext
   MONGODB_URI=mongodb://<username>:<password>@host:port/database
   PORT=5000
   ```

5. (Optional) Seed the database with initial data:
   ```bash
   cd ../backend
   npm run seed
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd ../frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

To deploy the application, follow these steps:

1. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```

2. Ensure your backend server serves the static files from the React build.

3. Deploy the backend to a hosting service like Heroku, DigitalOcean, or AWS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)#   D e v f o l i o  
 