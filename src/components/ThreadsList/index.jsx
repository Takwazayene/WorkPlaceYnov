import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { sendThreads } from "../../store/reducers/thread";
const useStyles = makeStyles({
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
  addButton: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    textDecoration: "none",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#1a237e",
    },
  },
  threadList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  threadItem: {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  threadTitle: {
    textAlign: "center",
    color: "#3f51b5",
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "5px",
  },
  threadSlug: {
    color: "#555",
    marginBottom: "10px",
  },
  threadLink: {
    color: "#3f51b5",
    textDecoration: "none",
    position: "right",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
});
function ThreadsList({ groupId }) {
  const classes = useStyles();
  const [threads, setThreads] = useState([]);
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/search`;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("TOKEN");
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const threadsTmp = response.data["hydra:member"].filter((thread) => {
        return thread.relatedGroup === `/api/groups/${groupId}`;
      });
      setThreads(threadsTmp);
      // dispatch(sendThreads(threadsTmp)); 

    })();
  }, [groupId]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredThreads = threads.filter((thread) => {
    return (
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        Threads <QuestionAnswerIcon />
      </h3>
      <Link
        to={`/groups/${groupId}/threadCreate`}
        className={classes.addButton}
      >
        Ajouter un Thread
      </Link>

      <input
        type="text"
        placeholder="Rechercher un thread"
        value={searchTerm}
        className={classes.searchInput}
        onChange={handleSearchChange}
      />
      <ul className={classes.threadList}>
        {filteredThreads.map((thread) => {
          const id = thread["@id"].split("/")[3];

          return (
            <li key={id} className={classes.threadItem}>
              <h3 className={classes.threadTitle}>{thread.title}</h3>
              <p className={classes.threadSlug}>{thread.slug}</p>
              <Link
                to={`/groups/${groupId}/threads/${id}`}
                className={classes.threadLink}
              >
                Voir le thread
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ThreadsList;
