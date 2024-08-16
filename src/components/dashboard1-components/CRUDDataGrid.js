// src/components/dashboard1-components/CRUDDataGrid.js

import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, Alert, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function CRUDDataGrid() {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [newRow, setNewRow] = useState({ asset: '', type: '', amount: '', date: '' });
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/transactions');
      setRows(data.data);
      setFilteredRows(data.data);
    } catch (error) {
      console.error("There was an error fetching the transactions!", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = rows.filter((row) =>
      Object.keys(row).some(
        (key) => row[key].toString().toLowerCase().indexOf(value) > -1
      )
    );
    setFilteredRows(filtered);
  };

  const handleAddClick = () => {
    setNewRow({ asset: '', type: '', amount: '', date: '' });
    setAddDialogOpen(true);
  };

  const handleAddConfirm = async () => {
    if (!newRow.asset || !newRow.type || !newRow.amount || !newRow.date) {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/transactions', newRow);
      console.log(response.data); // Use the response data or handle it accordingly
      fetchRows();  // Refresh data after addition
      setAddDialogOpen(false);
      setSnackbarMessage('Successfully added a new record.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to add a new record.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedRow(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${selectedRow}`);
      fetchRows();  // Refresh data after deletion
      setDeleteDialogOpen(false);
      setSnackbarMessage('Successfully deleted the record.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to delete the record.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = async () => {
    if (!selectedRow.asset || !selectedRow.type || !selectedRow.amount || !selectedRow.date) {
      setSnackbarMessage('Please fill out all fields.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    try {
      await axios.put(`http://localhost:5000/transactions/${selectedRow.id}`, selectedRow);
      fetchRows();  // Refresh data after update
      setEditDialogOpen(false);
      setSnackbarMessage('Successfully updated the record.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to update the record.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'asset', headerName: 'Asset', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
    { field: 'date', headerName: 'Date', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: '100%', marginTop:'100px' }}>
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          Transactions
        </Typography>
        <TextField
          value={searchText}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: <SearchIcon position="start" />,
          }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick} style={{ marginLeft: 16 }}>
          Add New
        </Button>
      </Toolbar>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{"Are you sure you want to delete this record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this record is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Asset"
            type="text"
            fullWidth
            value={selectedRow?.asset || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, asset: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={selectedRow?.type || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={selectedRow?.amount || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, amount: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={selectedRow?.date || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Record Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Asset"
            type="text"
            fullWidth
            value={newRow.asset}
            onChange={(e) => setNewRow({ ...newRow, asset: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            value={newRow.type}
            onChange={(e) => setNewRow({ ...newRow, type: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newRow.amount}
            onChange={(e) => setNewRow({ ...newRow, amount: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={newRow.date}
            onChange={(e) => setNewRow({ ...newRow, date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddConfirm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for User Feedback */}
      <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
