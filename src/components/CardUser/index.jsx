import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "80%",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: "50%",
  },
  text: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#3f51b5",
    textAlign: "center",
    fontStyle: "italic",
    textDecoration: "none",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function CardUser({ user, redirect = false }) {
  const classes = useStyles();
  if (!user) {
    return <Loader />;
  }
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.box}>
          <img
            src="../asserts/images/profile.png"
            alt="profile"
            className={classes.image}
          />

          <Typography className={classes.text}>{user.nickname}</Typography>
        </div>
        <div className={classes.content}>
          {user.email ? (
            <Typography className={classes.title}>
              <strong>Email:</strong> {user.email}
            </Typography>
          ) : null}

          {redirect ? (
            <Link size="small" to={`/userList/${user.id}`}>
              <Button className={classes.button}>Consulter</Button>
            </Link>
          ) : null}
        </div>
      </Card>
    </Container>
  );
}

export default CardUser;
