import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { motion } from "framer-motion";
import GroupsList from "../components/GroupList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5),
    textAlign: "center",
  },
  logo: {
    height: "150px",
  },
  title: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img
            src="..\asserts\images\logo.png"
            alt="Logo"
            className={classes.logo}
          />
        </Grid>
        <Grid item>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ textAlign: "center" }}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Typography variant="h3" className={classes.title}>
                Bienvenue sur Workplace Ynov !
              </Typography>
            </motion.div>
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Typography variant="subtitle1" className={classes.subtitle}>
                Rejoignez votre communauté Ynov
              </Typography>

              <GroupsList access="guest" />
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
