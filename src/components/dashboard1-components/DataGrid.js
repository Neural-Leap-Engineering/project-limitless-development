// src/components/dashboard1-components/DataGrid.js

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'asset', headerName: 'Asset', width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 110 },
  { field: 'value', headerName: 'Value', type: 'number', width: 150 },
  { field: 'change', headerName: 'Change (24h)', type: 'number', width: 150 },
];

const rows = [
  { id: 1, asset: 'Bitcoin', amount: 1.2, value: 45000, change: 5 },
  { id: 2, asset: 'Ethereum', amount: 5, value: 15000, change: 3 },
  // Add more data as needed
];

export default function CryptoDataGrid() {
  return (
    <div style={{ height: 400, width: '98%' }}>
    <h3>Crypto Grid</h3>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
