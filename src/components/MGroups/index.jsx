import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { People as PeopleIcon } from "@material-ui/icons";
import GroupList from "../GroupList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#3f51b5",
    scrollbarColor: "#3f51b5 #fff",
  },
  button: {
    width: "200px",
    borderRadius: "50px",
    backgroundColor: "#3f51b5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3949ab",
    },
  },
  iconButton: {
    color: "#3f51b5",
  },
  groupTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#3f51b5",
  },
}));


function MGroups() {
  const classes = useStyles();


  return (
    <Container>
      <Card className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h1" className={classes.title}>
            <IconButton className={classes.iconButton}>
              <PeopleIcon fontSize="large" />
            </IconButton>
            Groupes créés
          </Typography>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                component={Link}
                to="/groups/add"
              >
                Créer un groupe
              </Button>
            </Grid>
          </Grid>
        </div>
        <GroupList access="owner" />
      </Card>
      <Card className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h2" className={classes.title}>
            <IconButton className={classes.iconButton}>
              <PeopleIcon fontSize="large" />
            </IconButton>
            Groupes abonnés
          </Typography>
        </div>
        <GroupList access="member" />
      </Card>

      <Card className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h2" className={classes.title}>
            <IconButton className={classes.iconButton}>
              <PeopleIcon fontSize="large" />
            </IconButton>
            Nouveaux groupes
          </Typography>
        </div>
        <GroupList access="guest" />
      </Card>
    </Container>
  );
}

export default MGroups;
