import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Avatar,
  Container,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Timeline as TimelineIcon,
  Email as EmailIcon,
} from "@material-ui/icons";
import MGroups from "../components/MGroups";
import NotFound from "./NotFound";
import CardUser from "../components/CardUser";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../components/Loader";
import PopUpDelete from "../components/PopUpDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  iconButton: {
    padding: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  root2: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: "auto",
  },
  title: {
    textAlign: "center",
    color: "#3f51b5",
    fontFamily: "Roboto",
    fontWeight: "bold",
    uppercase: "true",
    letterSpacing: "2px",
  },

  root3: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  friendItem: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  friendName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  sendMessageButton: {
    marginLeft: theme.spacing(2),
    borderRadius: "50px",
    backgroundColor: "#3f51b5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3949ab",
    },
  },
  component: {
    backgroundColor: "#B22222",
    color: "white",
    borderRadius: "20px",
    width: "200px",
    position: "relative",
    left: "70%",
    transform: "translateY(-50%)",
  },
}));

function Profil() {
  const classes = useStyles();
  const base_url = "http://127.0.0.1:8000";
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const url = `${base_url}/api/users/1/info`;
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    setUser(currentUser);
  }, [url, currentUser]);

  if (!user) {
    <Loader />;
  }

  if (error) {
    return <NotFound />;
  }
  const friends = [
    {
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=35",
    },
    {
      name: "Amel Smith",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Sandra Smith",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      name: "Bob Johnson",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "William Quentin",
      avatar: "https://i.pravatar.cc/150?img=2",
    },

    { name: "Talwa Zay", avatar: "https://i.pravatar.cc/150?img=21" },
  ];

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h4" gutterBottom>
        MON PROFIL{" "}
      </Typography>
      <Box className={classes.root2}>
        <Paper className={classes.paper}>
          <CardUser user={currentUser} />
          <br />   <br />   <br />
          <div className={classes.component}>
            <PopUpDelete />
          </div>
        </Paper>
      </Box>

      <Container className={classes.root3}>
        <Grid container spacing={2}>
          {friends.map((friend) => (
            <Grid key={friend.id} item xs={12} sm={6} md={4}>
              <div className={classes.friendItem}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      alt={friend.name}
                      src={friend.avatar}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6" className={classes.friendName}>
                      {friend.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.sendMessageButton}
                    >
                      Envoyer un message
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <IconButton className={classes.iconButton}>
              <TimelineIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">Statistiques</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <IconButton className={classes.iconButton}>
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">Boite de réception</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <IconButton className={classes.iconButton}>
              <SettingsIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">Paramètres</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <IconButton className={classes.iconButton}>
              <HelpIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">Aide</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box className={classes.root2}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.title}
            variant="h4"
            gutterBottom
          ></Typography>
          <Grid container spacing={3}>
            <MGroups />
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default Profil;
