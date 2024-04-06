import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CardGroup from "../components/CardGroup";
import ThreadsList from "../components/ThreadsList";
import RequestsList from "../components/RequestsList";
import MembersList from "../components/MembersList";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    height: "100vh",
  },
  cardGroup: {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    height: "fit-content",
    margin: "5%",
    width: "60%",
  },
  requestsList: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px",
  },
  threadsList: {
    width: "30%",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px",
  },
  membersList: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "20px",
  },
  deleteButton: {
    position: "absolute",
    right: "20px",
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },
});

function Group() {
  let { idGroup } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [group, setGroup] = useState();
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/groups/${idGroup}`;
  const currentUser = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("TOKEN");
  const [isOwner, setIsOwner] = useState(false);
  const [ownerId, setOwnerId] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(url);
        setGroup(response.data);
        const ownerId =
          response.data.owner && response.data.owner.split("/").pop();
        const isOwner = ownerId == currentUser.id;
        console.log("isOwner", isOwner);
        setOwnerId(ownerId);
        setIsOwner(isOwner);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [idGroup, isOwner, currentUser, url]);

  if (!group) {
    return <Loader />;
  }
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}`, {
        headers: { Authorization: token },
      });

      navigate("/profil");
      if (response.status == 500 || response.status == 401) {
        const notify = () => {
          toast(
            "Une erreur est survenue, La suppression du groupe a échoué , elle est référencée par des threads dans la table de threads",
            {
              position: toast.POSITION.TOP_CENTER,
              type: toast.TYPE.ERROR,
              onClose: () => {
                setTimeout(() => {
                  navigate("/");
                }, 5000);
              },
            }
          );
        };
        notify();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={classes.cardGroup}>
        <CardGroup group={group} isDisplayed={true} />

        {isOwner && (
          <Button
            className={classes.deleteButton}
            endIcon={<Delete />}
            variant="contained"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            Supprimer le groupe
          </Button>
        )}
      </div>
      <div className={classes.container}>
        <div className={classes.threadsList}>
          <ThreadsList groupId={idGroup} />
        </div>
        <div className={classes.membersList}>
          <MembersList groupId={idGroup} owner={group.owner} />
        </div>
        <div className={classes.requestsList}>
          {isOwner && <RequestsList groupId={idGroup} />}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Group;
