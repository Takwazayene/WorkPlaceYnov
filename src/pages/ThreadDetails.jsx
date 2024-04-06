import { Container, Typography, Paper, Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { sendThreads, setCurrentThread } from "../store/reducers/thread";
import { addMessage, setMessages } from "../store/reducers/message";
import { makeStyles } from "@mui/styles";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "O%",
    padding: "1rem",
    overflow: "hidden",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "10px",
    textTransform: "uppercase",
  },
  button: {
    borderRadius: "50%",
   position: "relative",
   left : "70%",
  },
  messagesContainer: {
    height: "calc(500px)",
    overflowY: "scroll",
    padding: "1rem",
    backgroundColor: "#F6F6F6",
  },
  paper: {
    flexGrow: 1,
    overflowY: "auto",
    backgroundColor: "#F0F0F0",
    padding: "1rem",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
  },
  formInput: {
    flexGrow: 1,
    padding: "0.5rem 1rem",
    marginRight: "1rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#fff",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    fontSize: "1rem",
    outline: "none",
  },
  formButton: {
    color: "#fff",
    backgroundColor: "#3f51b5",
    borderRadius: "999px",
    margin: " 1rem",
    padding: "1rem 1rem",
    textDecoration: "none",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.8,
    },
  },
  messageOwner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "1rem",
  },
  messageOther: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: "1rem",
  },
  messageOtherName: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  messageOwnerText: {
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  messageOtherText: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  messageTime: {
    fontSize: "0.8rem",
    marginTop: "0.5rem",
  },
}));

const ThreadDetails = () => {
  const dispatch = useDispatch();
  const { groupId, threadId } = useParams();
  const thread = useSelector((state) => state.thread.current);
  const messages = useSelector((state) => state.message.messages);
  const base_url = "http://127.0.0.1:8000";
  const currentUser = useSelector((state) => state.auth.user);
  const messageRef = useRef(null);
  const classes = useStyles();
  const socket = socketIOClient(ENDPOINT);

  function formatMessageTime(date) {
    const options = { hour: "numeric", minute: "numeric" };
    return new Intl.DateTimeFormat("default", options).format(new Date(date));
  }

  const send = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/api/messages`,
        { content: messageRef.current.value, thread: thread["@id"] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      socket.emit("add message", response.data);
      dispatch(addMessage(response.data));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    socket.on("new message", (data) => {
      dispatch(setMessages(data));
    });
    (async () => {
      try {
        const threadResponse = await axios.get(
          `${base_url}/api/threads/${threadId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );

        dispatch(setCurrentThread(threadResponse.data));
        dispatch(sendThreads(threadResponse.data)); 

        const messagesResponse = await axios.get(
          `${base_url}/api/threads/${threadId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );
        dispatch(setMessages(messagesResponse.data["hydra:member"]));
        socket.emit("start messages", messagesResponse.data["hydra:member"]);

      } catch (err) {
        throw new Error(err.message);
      }
    })();
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Typography className={classes.title}>{thread?.title}</Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/groups/${groupId}`}
          className={classes.button}
        >
          Retour au groupe
        </Button>
        <Paper className={classes.messagesContainer}>
          <Paper className={classes.paper}>
            {messages.map((message) => (
              <Box
                key={message["@id"]}
                className={
                  message.owner === currentUser
                    ? classes.messageOwner
                    : classes.messageOther
                }
                data-testid="message"
              >
                {message.owner !== currentUser && (
                  <Typography
                    variant="body2"
                    className={classes.messageOtherName}
                  >
                    {message.owner}
                  </Typography>
                )}
                <Typography
                  className={
                    message.owner === currentUser
                      ? classes.messageOwnerText
                      : classes.messageOtherText
                  }
                >
                  {message.content}
                </Typography>
                <Typography variant="caption" className={classes.messageTime}>
                  {formatMessageTime(message.createdAt)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Paper>

        <form onSubmit={send} className={classes.form}>
          <input
            type="text"
            ref={messageRef}
            className={classes.formInput}
            defaultValue={messageRef.current ? messageRef.current.value : ""}
          />
          <button type="submit" className={classes.formButton}>
            Envoyer
          </button>
        </form>
      </Container>
    </>
  );
};

export default ThreadDetails;
