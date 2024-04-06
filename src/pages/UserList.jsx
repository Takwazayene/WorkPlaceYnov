import axios from "axios";
import React, { useState, useEffect } from "react";
import CardUser from "../components/CardUser";
import NotFound from "../pages/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { setUsers as setUsersReducer } from "../store/reducers/user";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  cardContainer: {
    margin: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "35%",
    },
  },
}));

function UserList() {
  const classes = useStyles();
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/users`;
  const [error, setError] = useState(null);
  const [users, setUsers] = useState();
  const usersInternal = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const retrieveUsers = async () => {
    try {
      let response = await axios.get(url);
      let usersTmp = response.data["hydra:member"];
      dispatch(setUsersReducer(usersTmp));
      setUsers(usersTmp);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (usersInternal.length > 0) {
      console.log("usersInternal", usersInternal);
      setUsers(usersInternal);
    } else {
      retrieveUsers();
    }
  }, [usersInternal]);

  if (error) {
    return <NotFound />;
  }

  if (!users) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      {users.map((user) => (
        <div key={user.id} className={classes.cardContainer}>
          <CardUser user={user} redirect={true} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
