import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Loader from "../Loader";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "25px",
    color: "#3f51b5",
    fontWeight: "bold",
    fontSize: "24px",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  name: {
    color: "#3f51b5",
    fontSize: "18px",
    margin: 0,
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    marginTop: "10px",
    cursor: "pointer",
    position: "relative",
    left: "50%",
  },
  noRequest: {
    fontSize: "18px",
    margin: "20px 0",
    textAlign: "center",
    color: "#3f51b5",
  },
}));

function RequestsList() {
  const classes = useStyles();
  let { idGroup } = useParams();
  const base_url = "http://127.0.0.1:8000";
  const urlGet = `${base_url}/api/groups`;
  const urlPost = `${base_url}/api/group_requests`;
  const [requests, setRequests] = useState(null);

  async function acceptRequest(request) {
    try {
      let reponse = await axios.post(
        `${urlPost}/${request.id}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${urlGet}/${idGroup}/requests`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        });

        let requestsTmp = response.data["hydra:member"];

        requestsTmp = await Promise.all(
          requestsTmp.map(async (request) => {
            const userId = request.targetUser.split("/").pop();
            let response2 = await axios.get(`${base_url}/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
              },
            });
            return {
              ...request,
              targetUser: response2.data.nickname,
            };
          })
        );

        setRequests(requestsTmp);
        return response.data["hydra:member"].filter(
          ({ status }) => status === 0
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!requests) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        Liste des demandes
        <ListAltIcon />
      </h3>
      {requests.length > 0 ? (
        <ul className={classes.list}>
          {requests.map((request) => (
            <li key={request.id} className={classes.listItem}>
              <p className={classes.name}>{request.targetUser}</p>
              <button
                className={classes.button}
                onClick={() => acceptRequest(request)}
              >
                Accepter
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes.noRequest}>Aucune demande</p>
      )}
    </div>
  );
}

export default RequestsList;
