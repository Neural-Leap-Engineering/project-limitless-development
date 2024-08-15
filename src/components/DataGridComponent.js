import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableSortLabel from '@mui/material/TableSortLabel';
import AccountCreationForm from './AccountCreationForm';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Pagination,
  Grid,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import BarChartComponent from './BarChartComponent';
import { styled } from '@mui/material/styles';
import { CheckCircle, Error, Info, Replay } from '@mui/icons-material';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  color: '#fff',
  margin: '0 5px',
  padding: '6px 12px', // Reduced padding
  fontSize: '12px', // Reduced font size
  minHeight: '36px',
}));

const slimInputStyle = {
  '& .MuiInputBase-root': {
    padding: '6px 12px', // Reduced padding
  },
  '& .MuiInputLabel-root': {
    fontSize: '12px', // Reduced font size
  },
  '& .MuiInputBase-input': {
    fontSize: '12px', // Reduced font size
  },
};

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: '8px 12px',
    height: '36px',
  },
}));

const statusOptions = [
  { value: 'open', label: 'Open', icon: <Info />, color: '#2196f3' },
  { value: 'partiallyFilled', label: 'Partially Filled', icon: <Replay />, color: '#ff9800' },
  { value: 'filled', label: 'Filled', icon: <CheckCircle />, color: '#4caf50' },
  { value: 'rejected', label: 'Rejected', icon: <Error />, color: '#f44336' },
];

const CustomStatusSelect = ({ value, onChange }) => {
  const selectedStatus = statusOptions.find((option) => option.value === value) || statusOptions[0];

  return (
    <CustomSelect
      value={value}
      onChange={onChange}
      renderValue={(selected) => (
        <Box display="flex" alignItems="center">
          {selectedStatus.icon}
          <Typography sx={{ ml: 1, color: selectedStatus.color }}>
            {selectedStatus.label}
          </Typography>
        </Box>
      )}
      sx={{
        ...slimInputStyle, // Apply slim style here
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiSvgIcon-root': {
          display: 'none',
        },
      }}
    >
      {statusOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box display="flex" alignItems="center">
            <IconButton sx={{ color: option.color }}>
              {option.icon}
            </IconButton>
            <Typography sx={{ ml: 1 }}>{option.label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

const DataGridComponent = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('type');
  const [status, setStatus] = useState('open');
  const [status2, setStatus2] = useState('open');
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/financial-data')
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleStatusChange2 = (event) => {
    setStatus2(event.target.value);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Financial Performance Monitoring Datagird
          </Typography>

          {/* Toolbar */}
          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={12} md={8}>
              <TextField
                variant="outlined"
                label="Search List"
                fullWidth
                sx={slimInputStyle}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CustomButton variant="contained" fullWidth onClick={handleOpenForm}>
                    Create Record
                  </CustomButton>
                </Grid>
                <Grid item xs={4}>
                  <CustomButton variant="contained" fullWidth>
                    Import Data
                  </CustomButton>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth sx={slimInputStyle}>
                    <InputLabel>More Actions</InputLabel>
                    <Select>
                      <MenuItem value="excel">Export to Excel</MenuItem>
                      <MenuItem value="csv">Export to CSV</MenuItem>
                      <MenuItem value="print">Print</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Filters */}
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth sx={slimInputStyle}>
                <InputLabel>Type</InputLabel>
                <Select>
                  <MenuItem value="owner">Owner</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField variant="outlined" label="Name" fullWidth sx={slimInputStyle} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField variant="outlined" label="Email" fullWidth sx={slimInputStyle} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField variant="outlined" label="Phone" fullWidth sx={slimInputStyle} />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField type="date" variant="outlined" fullWidth sx={slimInputStyle} />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth sx={slimInputStyle}>
                <InputLabel>Status</InputLabel>
                <Select>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Data Grid */}
          <TableContainer component={Paper} sx={{ marginTop: '20px', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 1200 }}>
              <TableHead sx={{ backgroundColor: '#007bff', color: '#ffffff' }}>
                <TableRow>
                  <TableCell sx={{ color: '#ffffff' }}>
                    <TableSortLabel
                      active={orderBy === 'type'}
                      direction={orderBy === 'type' ? orderDirection : 'asc'}
                      onClick={() => handleSortRequest('type')}
                      sx={{ color: '#ffffff' }}
                    >
                      Account Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? orderDirection : 'asc'}
                      onClick={() => handleSortRequest('name')}
                      sx={{ color: '#ffffff' }}
                    >
                      Client Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Job Title</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Email</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Phone</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Equity (%)</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Current Status</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Progress</TableCell>
                  <TableCell sx={{ color: '#ffffff', textAlign: 'center' }}>
                    Sales Data
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.equity}</TableCell>
                    <TableCell>
                      <CustomStatusSelect value={row.status} onChange={() => {}} />
                    </TableCell>
                    <TableCell>
                      <LinearProgress variant="determinate" value={row.progress} />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Box width="300px" height="150px">
                        <BarChartComponent data={row.salesData} id={`barchart-${row.id}`} />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}
          />

          {/* Export Options */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <CustomButton>Export to PDF</CustomButton>
            <CustomButton>Export to Excel</CustomButton>
            <CustomButton>Print</CustomButton>
          </Box>
        </CardContent>
      </Card>
      {/* Account Creation Form */}
      <AccountCreationForm open={openForm} handleClose={handleCloseForm} />
    </Container>
  );
};

export default DataGridComponent;
