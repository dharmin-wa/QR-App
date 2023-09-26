import * as React from "react";
import { Paper, Typography } from "@mui/material";

export default function DefaultErrorView() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Error</Typography>
      <Typography variant="body1">
        Unexpected errors occurred. to refresh the page and try again
      </Typography>
    </Paper>
  );
}
