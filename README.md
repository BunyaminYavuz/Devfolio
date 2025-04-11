# 💼 Devfolio

**Devfolio** is a modern, customizable developer portfolio and project showcase application. It is designed for developers who want to display their skills, projects, and contact information in a sleek and professional format. The project is built using **React.js** for the frontend, **Node.js (Express)** for the backend, and **MongoDB** for database management.

## 📌 Live Demo

> 🚧 _https://bunyamin.onrender.com/_

---

## ✨ Features

- 🖼️ **Project Showcase**
  - List and filter projects dynamically on the frontend.
  - Display project details including descriptions, technologies, and links.
- 🔒 **Admin Panel**
  - Secure interface for administrators.
  - Functionality to add, edit, and delete projects.
  - Functionality to manage project categories.
- 📬 **Contact Form**
  - Integrated form for visitors to send direct messages.
  - Backend handles message submission (e.g., email integration).
- 🗃️ **Category Management**
  - Create, update, and delete project categories.
  - Enables better organization and filtering of projects.
- 💅 **Responsive Design**
  - Provides an optimal viewing experience across various devices (desktops, tablets, mobile).
- 🌐 **RESTful API**
  - Backend API built with Express.js.
  - Endpoints for managing projects, categories, and contact form submissions.

---

## 🧰 Tech Stack

| Frontend      | Backend       | Database | Others         |
|---------------|---------------|----------|----------------|
| React.js      | Node.js       | MongoDB  | Express.js     |


---
## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version >= 14 recommended)
- [npm](https://www.npmjs.com/) (version >= 6 recommended) or [yarn](https://yarnpkg.com/) (version >= 1 recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a MongoDB Atlas cluster setup)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/BunyaminYavuz/Devfolio.git](https://github.com/BunyaminYavuz/Devfolio.git)
   ```

2.  **Navigate to the backend and install dependencies:**

    ```bash
    cd Devfolio/server
    npm install
    # or yarn install
    ```

3.  **Set up environment variables for the backend:**

      - Create a `.env` file in the `server` directory.
      - Add your MongoDB connection URI and the desired port for the backend server:
        ```
        MONGO_URI=your_mongodb_connection_string
        PORT=5000
        # Add other necessary environment variables (e.g., email configuration)
        ```

4.  **Start the backend server:**

    ```bash
    npm start
    # or yarn start
    ```

    The backend server should now be running on the specified port (e.g., `http://localhost:5000`).

5.  **Navigate to the frontend and install dependencies:**

    ```bash
    cd ../client
    npm install
    # or yarn install
    ```

6.  **Start the frontend application:**

    ```bash
    npm start
    # or yarn start
    ```

    The frontend application will typically start on `http://localhost:3000`.

## 📸 Screenshots

*Homepage showcasing developer portfolios' contact information.*

![image](https://github.com/user-attachments/assets/144ef08e-f7a7-4d42-9dd3-53209bd4a72d)
![image](https://github.com/user-attachments/assets/667c3499-c4a6-44d6-971b-15f97aa1f679)


*Admin interface for managing About Me, Dashboard, Projects, Categories, Profile, Activity Logs, Messages.*

![image](https://github.com/user-attachments/assets/4f022627-4c06-40a5-828a-5fbf6b59525d)


*Detailed view of a project's page.*

![image](https://github.com/user-attachments/assets/5893423c-dbf3-4906-a29b-b75f62f3da49)
![image](https://github.com/user-attachments/assets/cf12b493-0545-4889-8c3b-4ea28297a664)


## 🧑‍💻 Author

GitHub: [@BunyaminYavuz](https://github.com/BunyaminYavuz)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.
```
