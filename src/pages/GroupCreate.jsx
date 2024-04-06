import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Box, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tite: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#3f51b5",
    scrollbarColor: "#3f51b5 #fff",
  },
  formContainer: {
    margin: theme.spacing(1),
    width: "40ch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
  logo: {
    border: "0",
    width: "100px",
    height: "100px",
  },
}));

function GroupCreate() {
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/groups`;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    (async () => {
      const token = localStorage.getItem("TOKEN");
      const reponse = await axios.post(
        url,
        {
          name: name,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("new group", response.data.group);
      navigate("/profil");
    })();
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.tite} variant="h5" component="h1">
        Créer un groupe
        <img
          src="..\asserts\images\logo.png"
          alt="Logo"
          className={classes.logo}
        />
      </Typography>
      <Box
        component="form"
        className={classes.formContainer}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="name"
          label="Nom"
          variant="outlined"
        />
        <TextField
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="description"
          label="Description"
          type="text"
          variant="outlined"
        />
        <Button
          className={classes.button}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Créer
        </Button>
      </Box>
    </Box>
  );
}

export default GroupCreate;
