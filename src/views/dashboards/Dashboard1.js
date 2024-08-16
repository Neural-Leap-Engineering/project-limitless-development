import React from "react";
import { Grid, Box } from "@mui/material";

import {
  // BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
  CryptoDataGrid,
  MarketChart,
  AdvancedCard,
  // TransactionHistoryTable,
  PortfolioPieChart,
  CRUDDataGrid
} from "./dashboard1-components";


// import CryptoDataGrid from './dashboard1-components/DataGrid';
// import MarketChart from './dashboard1-components/MarketChart';
// import AdvancedCard from './dashboard1-components/AdvancedCard';

const Dashboard1 = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>

        {/* ------------------------- row 3 ------------------------- */}
        {/* <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid> */}
        
        {/* ------------------------- row 4 (Compact Advanced Cards) ------------------------- */}
        
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={4}>
            <AdvancedCard title="Total Portfolio Value" value="$120,000" change={5.2} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdvancedCard title="Daily Earnings" value="$1,500" change={2.5} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdvancedCard title="Top Performing Asset" value="Bitcoin" change={7.8} />
          </Grid>
        </Grid>
        
        {/* ------------------------- row 5 ------------------------- */}
        <Grid item xs={12} lg={8}>
          <MarketChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <PortfolioPieChart />
        </Grid>

        {/* ------------------------- row 6 ------------------------- */}
        <Grid item xs={12}>
          <CryptoDataGrid />
        </Grid>

        {/* ------------------------- row 7 ------------------------- */}
        <Grid item xs={12}>
          <CRUDDataGrid />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
