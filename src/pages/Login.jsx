import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TextField, Button, Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../store/reducers/auth";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
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
  form: {
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(1),
    width: "55ch",
    borderRadius: "20px",
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(1, 4),
    borderRadius: "20px",
    width: "30ch",
    background: "linear-gradient(45deg, #3f51b5	 30%, mediumpurple 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

function Login() {
  const classes = useStyles();
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/auth`;
  const urlInformations = `${base_url}/api/users/1/info`;
  const urlGroups = `${base_url}/api/users/`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function HandleSubmit() {
    (async () => {
      try {
        const response = await axios.post(
          url,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        let token = response.data.token;
        localStorage.setItem("TOKEN", token);
        const reponseInfos = await axios.get(urlInformations, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = reponseInfos.data;

        const reponseGroups = await axios.get(`${urlGroups}${data.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataGroups = reponseGroups.data;
        data.OwnedGroups = dataGroups.OwnedGroups;
        data.subscribedGroups = dataGroups.subscribedGroups;

        dispatch(login(data));
        socket.emit("user login", {id: data.id, username: data.nickname});
        navigate("/profil");
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <img
            src="..\asserts\images\logo.png"
            alt="Logo"
            className={classes.logo}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Vous voila sur le site de la communauté des développeurs !
          </Typography>
        </Grid>
      </Grid>

      <form className={classes.form}>
        <Box>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className={classes.input}
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            className={classes.input}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          onClick={() => HandleSubmit()}
          className={classes.button}
          variant="contained"
          color="primary"
          data-testid="submit-login"
        >
          Se Connecter
        </Button>
      </form>
    </div>
  );
}

export default Login;
