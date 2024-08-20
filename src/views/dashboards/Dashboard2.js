import React from "react";
import { Grid, Box } from "@mui/material";

import {
  // BlogCard,
  // SalesOverview,
  // ProductPerformance,
  // DailyActivities,
  // CryptoDataGrid,
  // MarketChart,
  // AdvancedCard,
  CustomDataGrid,
  // TransactionHistoryTable,
  // PortfolioPieChart,
  // CRUDDataGrid
} from "./dashboard1-components";


// import CryptoDataGrid from './dashboard1-components/DataGrid';
// import MarketChart from './dashboard1-components/MarketChart';
// import AdvancedCard from './dashboard1-components/AdvancedCard';

const Dashboard2 = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <CustomDataGrid />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard2;
