import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import QRTypography from "../shared/QRTypography";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleHead: {
      height: "calc(100vh - 64px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0 20",
      "& svg": {
        fontSize: 96,
        marginBottom: 40,
        [theme.breakpoints.down("md")]: {
          fontSize: 70,
          marginBottom: 20,
        },
      },
      "& h3.MuiTypography-root": {
        fontSize: 40,
        [theme.breakpoints.down("md")]: {
          fontSize: 25,
        },
      },
    },
  }),
);

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.titleHead}>
      <ReportProblemIcon />
      <QRTypography variant="h3"> Oops! page not found</QRTypography>
    </div>
  );
};

export default React.memo(NotFound);
