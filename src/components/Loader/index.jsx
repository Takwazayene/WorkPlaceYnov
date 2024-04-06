import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loader: {
    color: "#3f51b5",
  },
  text: {
    color: "#3f51b5",
    marginLeft: "1rem",
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loader} size={60} thickness={4} />
      <Typography className={classes.text} variant="h5">
        Chargement...
      </Typography>
    </div>
  );
};

export default Loader;
