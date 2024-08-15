const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample data to mimic your financial data
let financialData = [
  {
    id: 1,
    type: 'Owner',
    name: 'John Doe',
    jobTitle: 'CEO',
    email: 'john@example.com',
    phone: '1-702-555-3693',
    equity: 50,
    status: 'open',
    progress: 80,
    salesData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#3f51b5',
          data: [30, 20, 40, 25, 50, 30, 60, 70, 50, 90, 100, 110],
        },
      ],
    },
  },
  {
    id: 2,
    type: 'Business',
    name: 'Larry Bells & CO',
    jobTitle: 'CTO',
    email: 'larry@example.com',
    phone: '1-702-539-3493',
    equity: 25,
    status: 'open',
    progress: 50,
    salesData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Sales',
          backgroundColor: '#f50057',
          data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
        },
      ],
    },
  },
];

// GET endpoint to fetch all financial data
app.get('/api/financial-data', (req, res) => {
  res.json(financialData);
});

// POST endpoint to create new financial data
app.post('/api/financial-data', (req, res) => {
  const newRecord = { id: financialData.length + 1, ...req.body };
  financialData.push(newRecord);
  res.status(201).json(newRecord);
});

// PUT endpoint to update financial data by ID
app.put('/api/financial-data/:id', (req, res) => {
  const { id } = req.params;
  const index = financialData.findIndex((record) => record.id == id);
  if (index !== -1) {
    financialData[index] = { ...financialData[index], ...req.body };
    res.json(financialData[index]);
  } else {
    res.status(404).json({ message: 'Record not found' });
  }
});

// DELETE endpoint to delete financial data by ID
app.delete('/api/financial-data/:id', (req, res) => {
  const { id } = req.params;
  financialData = financialData.filter((record) => record.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
