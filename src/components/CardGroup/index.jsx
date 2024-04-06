import React, { useState } from "react";
import Modal from "react-modal";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { ChevronRight } from "@material-ui/icons";
import { CardActions, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: "3rem",
    textDecoration: "solid",
    color: "#3f51b1",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  description: {
    paddingTop: "30px",
    fontSize: "1rem",
    color: "#000000",
  },
  divider: {
    backgroundColor: "#3f51b1",
    height: "2px",
    marginBottom: "10px",
    marginTop: "20px",
  },
  card: {
    height: "120%",
    display: "flex",
    borderRadius: "20px",
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    padding: "20px",
    margin: "10px",
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    mt: "10px",
  },
  linkButton: {
    width: "100%",
    textDecoration: "none",
    color: "white",
  },
  accessButton: {
    width: "100%",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#048b9a",
  },
  customModal: {
    marginTop: "20%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  modalContent: {
    marginTop: "20px",
  },
  modalTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#3f51b1",
  },
  modalText: {
    marginBottom: "20px",
  },
  modalButton: {
    position: "relative",
    left: "60%",
    backgroundColor: "grey",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "10px 20px",
    marginRight: "10px",
  },
  modalButtonLast: {
    backgroundColor: "#3f51b1",
    position: "relative",
    left: "60%",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "10px 20px",
    marginRight: "10px",
  },
}));
function CardGroup({ group, isGrid = false, isDisplayed = false }) {
  const { name, description, isMember = false, isOwner = false } = group;
  const id = group["@id"].split("/")[3];
  const classes = useStyles();
  const navigate = useNavigate();
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/group_requests`;
  const displayLink = isMember || isOwner;
  const token = localStorage.getItem("TOKEN");
  const currentUser = useSelector((state) => state.auth.user);
  console.log("currentUser: ", currentUser);
  console.log("token: ", token);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  Modal.setAppElement("#root");

  async function accessRequest() {
    if (currentUser == null && token == null) {
      const notify = () => {
        toast(
          " 🦄 Vous devez être connecté pour demander l'accès à un groupe. ",
          {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.ERROR,
            onClose: () => {
              setTimeout(() => {
                navigate("/login");
              }, 5000);
            },
          }
        );
      };
      notify();
    } else {
      setModalIsOpen(true);
      try {
        await axios.post(
          url,
          {
            targetGroup: `api/groups/${id}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        console.log("Access request sent");
        setTimeout(() => {
          setModalIsOpen(false);
        }, 4000);
      } catch (error) {
        console.log("Access request error: ", error);
      }
    }
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title}>{name}</Typography>
          <Divider className={classes.divider} />
          <CardActions className={classes.cardActions}>
            {isDisplayed ? (
              <Typography className={classes.description}>
                {description}
              </Typography>
            ) : null}
          </CardActions>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {isGrid ? (
            displayLink ? (
              <Button
                variant="contained"
                size="small"
                className={`${classes.seeGroupButton} ${classes.linkButton}`}
              >
                <Link to={`/groups/${id}`} className={classes.linkButton}>
                  Voir le groupe
                </Link>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  accessRequest();
                }}
                variant="contained"
                size="small"
                className={classes.accessButton}
                endIcon={<ChevronRight />}
              >
                Demander l'accès
              </Button>
            )
          ) : null}
        </CardActions>
      </Card>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
      />

      <Modal isOpen={modalIsOpen} className={classes.customModal}>
        <div className={classes.modalContent}>
          <h2 className={classes.modalTitle}>Demande d'ajout au groupe</h2>
          <p className={classes.modalText}>
            Voulez-vous envoyer une demande d'ajout au groupe "{name}" ?
          </p>

          <button
            className={classes.modalButtonLast}
            onClick={() => accessRequest()}
          >
            Envoyer
          </button>
          <button
            className={classes.modalButton}
            onClick={() => setModalIsOpen(false)}
          >
            Fermer
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CardGroup;
