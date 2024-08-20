import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseISO } from 'date-fns'; // Import parseISO
import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import {
    MenuItem, Select, LinearProgress, TextField, Pagination,
    IconButton, Button, Switch, FormControlLabel, Box, Chip, InputAdornment,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, Link, Avatar
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

function CustomDataGrid() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState(getInitialColumns);
    const [showHeaderRow, setShowHeaderRow] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            const parsedRows = response.data.data.map((row) => ({
                ...row,
                dueDate: row.dueDate ? parseISO(row.dueDate) : null, // Parse the dueDate string to Date object
            }));
            setRows(parsedRows);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const deleteColumn = (field) => {
        setColumns((prev) =>
            prev.filter((col) => col.field !== field)
        );
    };

    const addColumn = () => {
        const newColumn = {
            field: `custom-${columns.length + 1}`,
            headerName: `Custom ${columns.length + 1}`,
            width: 150,
            editable: true,
        };
        setColumns([...columns, newColumn]);
    };

    const handleColumnEdit = (field, newValue) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.field === field ? { ...col, headerName: newValue } : col
            )
        );
    };
    
    const handleEditChange = (field, value) => {
        setEditData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }

    function getInitialColumns() {
        return [
            {
                field: 'id',
                headerName: 'ID',
                width: 70,
            },
            {
                field: 'summary',
                headerName: 'Summary',
                width: 200,
                editable: true,
            },
            {
                field: 'status',
                headerName: 'Status',
                width: 150,
                renderCell: (params) => (
                    <Select
                        value={params.value}
                        onChange={(e) => handleStatusChange(params.id, e.target.value)}
                        variant="standard"
                        sx={{
                            '& .MuiSelect-select': {
                                padding: 0,
                            },
                        }}
                    >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                ),
            },
            {
                field: 'priority',
                headerName: 'Priority',
                width: 150,
                renderCell: (params) => (
                    <Chip
                        label={params.value}
                        sx={{
                            backgroundColor: params.value === 'Low' ? 'primary.main' :
                                params.value === 'Medium' ? 'secondary.main' :
                                    params.value === 'High' ? 'error.main' :
                                        'success.main',
                            color: '#fff',
                            pl: 2,
                            pr: 2,
                        }}
                        size="small"
                    />
                ),
            },
            {
                field: 'progress',
                headerName: 'Progress',
                width: 150,
                renderCell: (params) => <LinearProgress variant="determinate" value={params.value} />,
            },
            {
                field: 'dueDate',
                headerName: 'Due Date',
                width: 150,
                renderCell: (params) => (
                    <DatePicker
                        value={params.value}
                        onChange={(newValue) => handleDateChange(params.id, newValue)}
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                variant="standard"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '0.875rem',
                                        padding: '4px 8px',
                                    },
                                    '& .MuiInputAdornment-root': {
                                        marginRight: '4px',
                                    },
                                    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                                        borderBottom: 'none',
                                    },
                                }}
                            />
                        )}
                    />
                ),
            },
            {
                field: 'active',
                headerName: 'Active',
                width: 100,
                renderCell: (params) => (
                    <Checkbox
                        checked={params.value}
                        onChange={(e) => handleCheckboxChange(params.id, e.target.checked)}
                    />
                ),
            },
            {
                field: 'link',
                headerName: 'Link',
                width: 200,
                renderCell: (params) => (
                    <Link href={params.value} target="_blank" rel="noopener">
                        {params.value}
                    </Link>
                ),
            },
            {
                field: 'avatar',
                headerName: 'Avatar',
                width: 100,
                renderCell: (params) => (
                    <Avatar alt="Avatar" src={params.value} />
                ),
            },
            {
                field: 'amount',
                headerName: 'Amount',
                width: 150,
                renderCell: (params) => (
                    <TextField
                        value={params.value}
                        onChange={(e) => handleAmountChange(params.id, e.target.value)}
                        variant="standard"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                ),
            },
            {
                field: 'actions',
                headerName: 'Actions',
                width: 100,
                renderCell: (params) => (
                    <div>
                        <IconButton color="primary" onClick={() => handleEditRow(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteClick(params.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ),
            },
        ];
    }

    const handleStatusChange = async (id, value) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, { status: value });
            setRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, status: value } : row))
            );
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    const handleDateChange = async (id, value) => {
        try {
            const formattedDate = value ? value.toISOString() : null;
            await axios.put(`http://localhost:5000/tasks/${id}`, { dueDate: formattedDate });
            setRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, dueDate: formattedDate } : row))
            );
        } catch (error) {
            console.error('Failed to update task due date:', error);
        }
    };

    const handleCheckboxChange = async (id, checked) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, { active: checked ? 1 : 0 });
            setRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, active: checked } : row))
            );
        } catch (error) {
            console.error('Failed to update task active status:', error);
        }
    };

    const handleAmountChange = async (id, value) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, { amount: parseFloat(value) });
            setRows((prev) =>
                prev.map((row) => (row.id === id ? { ...row, amount: parseFloat(value) } : row))
            );
        } catch (error) {
            console.error('Failed to update task amount:', error);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedRowId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteRow = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${selectedRowId}`);
            setRows((prev) => prev.filter((row) => row.id !== selectedRowId));
            setDeleteDialogOpen(false);
            setSelectedRowId(null);
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleEditRow = (row) => {
        setEditData(row);
        setEditDialogOpen(true);
    };

    const addRow = async () => {
        const newRow = {
            summary: `Task ${rows.length + 1}`,
            status: 'To Do',
            priority: 'Low',
            progress: 0,
            dueDate: null,
            active: 0,
            link: 'https://www.example.com',
            avatar: 'https://via.placeholder.com/40',
            amount: 0,
        };
        try {
            const response = await axios.post('http://localhost:5000/tasks', newRow);
            setRows([...rows, { ...newRow, id: response.data.id }]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filteredRows = rows.filter(row =>
            row.summary.toLowerCase().includes(query)
        );
        setRows(filteredRows);
    };

    const saveEditRow = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${editData.id}`, editData);
            setRows((prev) =>
                prev.map((row) => (row.id === editData.id ? { ...editData } : row))
            );
            setEditDialogOpen(false);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ marginRight: 2, flexGrow: 1 }}
                    />
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addRow}
                            startIcon={<AddIcon />}
                            sx={{ marginRight: 1 }}
                        >
                            Add Row
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={addColumn}
                            startIcon={<AddIcon />}
                        >
                            Add Column
                        </Button>
                    </Box>
                </Box>
                <FormControlLabel
                    control={
                        <Switch checked={showHeaderRow} onChange={() => setShowHeaderRow(!showHeaderRow)} />
                    }
                    label="Edit Column Headings"
                    style={{ marginBottom: '20px' }}
                />
                {showHeaderRow && (
                    <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'auto' }}>
                        {columns.map((column) => (
                            <Box key={column.field} display="flex" alignItems="center" mr={2}>
                                <TextField
                                    value={column.headerName}
                                    onChange={(e) => handleColumnEdit(column.field, e.target.value)}
                                    variant="standard"
                                    InputProps={{ disableUnderline: true }}
                                    sx={{ minWidth: 100 }}
                                />
                                <IconButton onClick={() => deleteColumn(column.field)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </div>
                )}
                <div style={{ flex: 1, minHeight: 0, overflowX: 'auto' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        pagination
                        autoHeight
                    />
                </div>
                <div style={{ padding: '10px 0' }}>
                    <Pagination count={10} color="primary" />
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this row?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDeleteRow} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Row Dialog */}
                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                    <DialogTitle>Edit Row</DialogTitle>
                    <DialogContent>
                        {columns.map((column) => (
                            <React.Fragment key={column.field}>
                                {column.field === 'dueDate' ? (
                                    <DatePicker
                                        value={editData[column.field] || null}
                                        onChange={(newValue) => handleEditChange(column.field, newValue)}
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                variant="standard"
                                                fullWidth
                                                margin="dense"
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '0.875rem',
                                                        padding: '4px 8px',
                                                    },
                                                    '& .MuiInputAdornment-root': {
                                                        marginRight: '4px',
                                                    },
                                                    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                                                        borderBottom: 'none',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                ) : (
                                    <TextField
                                        margin="dense"
                                        label={column.headerName}
                                        value={editData[column.field] || ''}
                                        onChange={(e) => handleEditChange(column.field, e.target.value)}
                                        fullWidth
                                        variant="standard"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                fontSize: '0.875rem',
                                                padding: '4px 8px',
                                            },
                                            '& .MuiInputAdornment-root': {
                                                marginRight: '4px',
                                            },
                                            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                                                borderBottom: 'none',
                                            },
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={saveEditRow} color="secondary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </LocalizationProvider>
    );
}

export default CustomDataGrid;
