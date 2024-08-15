# Financial Performance Monitoring Dashboard

This project is a sophisticated web application designed to help financial analysts and business stakeholders visualize and manage the performance of various accounts, investments, or business units. The system is built with a data-driven approach, integrating rich data visualization techniques within a dynamic data grid, allowing for real-time updates, progress tracking, and detailed analysis.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Additionally, it includes a Node.js/Express backend to manage financial data.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs both the React app and the Express backend concurrently in the development mode.

- React app runs on [http://localhost:3000](http://localhost:3000).
- Express backend runs on [http://localhost:5000](http://localhost:5000).

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run start:frontend`

Runs the React app only.

#### `npm run start:backend`

Runs the Express backend only.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

#### `npm run start:backend`

This script starts only the Express backend server. The server will run on [http://localhost:5000](http://localhost:5000).

### Backend API Endpoints

The backend serves as a simple API to manage the financial data used in the frontend application.

- **GET** `/api/financial-data` - Fetch all financial data records.
- **POST** `/api/financial-data` - Create a new financial data record.
- **PUT** `/api/financial-data/:id` - Update an existing financial data record by ID.
- **DELETE** `/api/financial-data/:id` - Delete a financial data record by ID.

### Postman Collection

To interact with the backend API, you can use the provided Postman collection. Import the collection into Postman to easily test all available endpoints.

### Project Structure

my-data-grid-app/ 
├── public/ 
├── src/ │ 
├── components/ 
│ │ ├── AccountCreationForm.js 
│ │ ├── BarChartComponent.js 
│ │ ├── DataGridComponent.js 
│ ├── App.js 
│ ├── index.js 
│ ├── App.css 
│ ├── index.css 
├── server/ 
│ └── ├── server.js 
├── package.json 
└── README.md

### Deployment For deployment, you will need to build the frontend using `npm run build` and then deploy the `build` folder along with the Express server to your hosting provider. ### Learn More You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/). ## License This project is licensed under the MIT License.