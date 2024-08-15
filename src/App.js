import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DataGridComponent from './components/DataGridComponent';
import AccountCreationForm from './components/AccountCreationForm'; // Import the form component
import { CssBaseline } from '@mui/material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Bootstrap primary color
    },
    secondary: {
      main: '#ffc107', // Bootstrap warning color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  const [openForm, setOpenForm] = useState(false);
    
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <DataGridComponent />
        <AccountCreationForm open={openForm} handleClose={handleCloseForm} />
      </div>
    </ThemeProvider>
  );
}

export default App;
