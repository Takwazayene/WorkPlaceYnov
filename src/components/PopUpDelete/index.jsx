import * as React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: "#d32f2f",
    color: "white",
    borderRadius: "20px",
  },
}));

function PopUpDelete() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const base_url = "http://127.0.0.1:8000";
  const classes = useStyles();

  const handleDeleteAccount = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("currentUser", currentUser);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      await axios.delete(`${base_url}/api/users/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpen(false);
      dispatch(currentUser(null));
      dispatch(token(null));
      navigate.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        endIcon={<Delete />}
        variant="contained"
        color="error"
        size="small"
        onClick={handleDeleteAccount}
      >
        Supprimer mon compte
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supprimer votre compte ?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes-vous sûr de vouloir supprimer votre compte ?
            <br /> Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Supprimer</Button>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUpDelete;
