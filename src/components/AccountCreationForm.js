import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  color: '#fff',
  margin: '0 5px',
  padding: '6px 12px',
  fontSize: '14px',
}));

export default function AccountCreationForm({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    accountName: '',
    accountType: '',
    initialDeposit: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.accountName) errors.accountName = 'Account Name is required';
    if (!formValues.accountType) errors.accountType = 'Account Type is required';
    if (!formValues.initialDeposit) errors.initialDeposit = 'Initial Deposit is required';
    else if (isNaN(formValues.initialDeposit) || formValues.initialDeposit <= 0)
      errors.initialDeposit = 'Initial Deposit must be a positive number';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:5000/api/financial-data', formValues)
        .then((response) => {
          setSnackbarMessage('Account created successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          handleClose();
        })
        .catch((error) => {
          setSnackbarMessage('Failed to create account.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          console.error('There was an error creating the account!', error);
        });
    } else {
      setSnackbarMessage('Please fix the errors in the form.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Create New Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Account Name"
              name="accountName"
              value={formValues.accountName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!formErrors.accountName}
              helperText={formErrors.accountName}
            />
            <FormControl fullWidth margin="normal" error={!!formErrors.accountType}>
              <InputLabel>Account Type</InputLabel>
              <Select
                name="accountType"
                value={formValues.accountType}
                onChange={handleChange}
              >
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
              {formErrors.accountType && (
                <Typography variant="caption" color="error">
                  {formErrors.accountType}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Initial Deposit"
              name="initialDeposit"
              value={formValues.initialDeposit}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!formErrors.initialDeposit}
              helperText={formErrors.initialDeposit}
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <CustomButton onClick={handleClose}>Cancel</CustomButton>
              <CustomButton type="submit">Create Account</CustomButton>
            </Box>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
