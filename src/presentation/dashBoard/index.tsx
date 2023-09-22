import React from "react";
import { Grid, Box } from "@mui/material";
import { topModule } from "../../description/dashboard.description";

const Dashboard = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {topModule?.map((v: any, index: number) => {
          return (
            <Grid item xs={3} key={index}>
              {v}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Dashboard;
