import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function ThreadCreate() {
  let { idGroup } = useParams();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/threads`;
  const navigate = useNavigate();

  function handleSubmit() {
    (async () => {
      const token = localStorage.getItem("TOKEN");
      const reponse = await axios.post(
        url,
        {
          title: title,
          content: content,
          relatedGroup: `/api/groups/${idGroup}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

        }
      );
      console.log(reponse);

      navigate(`/groups/${idGroup}`);
    })();
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.tite} variant="h5" component="h1">
        Créer un thread
        <img
          src="..\asserts\images\logo.png"
          alt="Logo"
          className={classes.logo}
        />
      </Typography>

      <Box className={classes.formContainer}>
        <TextField
          id="outlined-basic"
          label="Titre"
          variant="outlined"
          value={title}
          data-testid="thread-title-input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Contenu"
          variant="outlined"
          value={content}
          data-testid="thread-content-input"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Créer
        </Button>
      </Box>
    </Box>
  );
}
export default ThreadCreate;
