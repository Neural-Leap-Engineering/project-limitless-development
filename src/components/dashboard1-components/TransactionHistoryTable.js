// src/components/dashboard1-components/TransactionHistoryTable.js

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'asset', headerName: 'Asset', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
  { field: 'date', headerName: 'Date', width: 180 },
];

const rows = [
  { id: 1, asset: 'Bitcoin', type: 'Buy', amount: 1.2, date: '2024-08-16' },
  { id: 2, asset: 'Ethereum', type: 'Sell', amount: 2.5, date: '2024-08-15' },
  // Add more transactions as needed
];

export default function TransactionHistoryTable() {
  return (
    <div style={{ height: 400, width: '98%' }}>
      <h3>Transaction History</h3>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
