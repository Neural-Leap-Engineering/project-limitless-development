# Financial Performance Monitoring Dashboard

This project is a Financial Performance Monitoring Dashboard designed for financial analysts to track and analyze the performance of various accounts and investments. The application features a dynamic data grid integrated with real-time data visualization, allowing users to monitor account statuses, track progress, and visualize sales data through embedded charts. The project is built with React, Material-UI, and SQLite, with an Express backend to manage transactions.

## Features

- **Dynamic Financial Data Grid**: Manage and view financial transactions with real-time data.
- **CRUD Operations**: Add, edit, and delete transactions in the grid.
- **Search and Filter**: Filter transactions based on various criteria.
- **Responsive Design**: The application is responsive and fits well on different screen sizes.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Inline Validation**: Real-time validation for forms to ensure data accuracy.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js (v12 or above)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/financial-performance-dashboard.git
   cd financial-performance-dashboard` 

2.  **Install frontend dependencies:**
         
 
       npm install
        # or
        yarn install
    
3.  **Install backend dependencies:**
    
    Navigate to the backend directory and install the required packages:

    cd backend
    npm install
 #or
    yarn install
    

### Running the Application

1.  **Start the backend server:**
    
    In the `backend` directory, run:
  
    `node server.js` 
    
    This will start the Express server on `http://localhost:5000`.
    
2.  **Start the frontend application:**
    
    In the root directory of the project, run:
    
npm start
or
yarn start
    
    The application will start in development mode on `http://localhost:3000`.
    

### Project Structure

-   **/src**: Contains all the frontend React components.
    -   **/components**: Reusable React components.
    -   **/components/dashboard1-components**: Specific components for the dashboard, including the CRUD data grid.
-   **/backend**: Contains the Express server setup and SQLite database connection.
    -   **server.js**: Main server file that handles API routes and database operations.

### API Endpoints

-   **GET /transactions**: Retrieve all transactions.
-   **POST /transactions**: Add a new transaction.
-   **PUT /transactions/**
    
    : Update an existing transaction by ID.
-   **DELETE /transactions/**
    
    : Delete a transaction by ID.

### Technologies Used

-   **Frontend**:
    
    -   React
    -   Material-UI
    -   Axios
-   **Backend**:
    
    -   Express.js
    -   SQLite
    -   Cors
    -   Body-parser

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

-   [Material-UI](https://material-ui.com/) for providing the UI components.
-   [React](https://reactjs.org/) for the front-end framework.
-   [SQLite](https://www.sqlite.org/) for the lightweight database engine.
-   [Express](https://expressjs.com/) for the backend server.

### Instructions to Replace Placeholder Text:
- Replace `"https://github.com/your-username/financial-performance-dashboard.git"` with the actual GitHub repository URL.
- If any additional installation or configuration steps are necessary, you can add them to the `Installation` and `Running the Application` sections.

This `README.md` provides a comprehensive overview of your project, including how to set it up, run it, and understand its structure and purpose. Let me know if you need any further customization!