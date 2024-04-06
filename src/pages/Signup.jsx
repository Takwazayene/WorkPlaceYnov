import { TextField, Button, Box, Typography, Grid } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    textAlign: "center",
  },
  logo: {
    height: "200px",
  },
  title: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    margin: theme.spacing(4),
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
    margin: theme.spacing(5),
    padding: theme.spacing(1, 4),
    width: "39ch",
    borderRadius: "20px",
    background: "linear-gradient(45deg, #3f51b5	 30%, mediumpurple 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));

function Signup() {
  const classes = useStyles();
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/users`;
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  function HandelChangePasswordConfirmation(e) {
    setPasswordConfirmation(e.target.value);
    if (password !== e.target.value) {
      setError(true);
    } else {
      setError(false);
    }
  }
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function HandleSubmit() {
    (async () => {
      try {
        const response = await axios.post(url, {
          nickname: nickname,
          email: email,
          plainPassword: password,
        });
        console.log(response);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <>
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
              Rejoignez la communauté des développeurs, partagez vos
              connaissances et apprenez de nouvelles compétences !{" "}
            </Typography>
          </Grid>
        </Grid>

        <form className={classes.form}>
          <Box>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Pseudo"
              variant="outlined"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </Box>
          <Box>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Email"
              required
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isValidEmail(email)}
              helperText={
                isValidEmail(email)
                  ? ""
                  : " Veuillez saisir une adresse email valide ; Exemple : user@exemple.com !"
              }
            />
          </Box>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Mot de passe"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/.test(
                  e.target.value
                )
              );
            }}
            error={!isPasswordValid}
            helperText={
              !isPasswordValid &&
              "Le mot de passe doit contenir au moins 12 caractères, des majuscules, des minuscules, des chiffres et des caractères spéciaux"
            }
          />

          <Box>
            <TextField
              className={classes.input}
              value={passwordConfirmation}
              onChange={(e) => HandelChangePasswordConfirmation(e)}
              id="password-confirmation"
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              required
              error={error}
              helperText={
                error ? " Les mots de passe ne correspondent pas !" : null
              }
            />
          </Box>

          <Button
            onClick={() => HandleSubmit()}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            S'inscrire
          </Button>
        </form>
      </div>
    </>
  );
}

export default Signup;
