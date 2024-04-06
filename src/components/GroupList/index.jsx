import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGroups as setGroupsAll,
  setGroupsMember,
  setGroupsOwned,
  sendGroup
} from "../../store/reducers/group";
import axios from "axios";
import CardGroup from "../CardGroup";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",

    backgroundColor: theme.palette.background.paper,
  },
  item: {
    width: "100%",
    margin: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
  },
}));
function GroupsList({ access = "all" }) {
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/groups`;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const classes = useStyles();
  const token = localStorage.getItem("TOKEN");
  const currentUser = useSelector((state) => state.auth.user);

  const retrieveGroups = async () => {
    try {
      let navigate = useNavigate;
      let response = await axios.get(url);
      let groupsTmp = response.data["hydra:member"];

      if (access === "owner") {
        groupsTmp = groupsTmp.filter((group) =>
          currentUser.ownedGroups.includes(group["@id"])
        );
        groupsTmp.forEach((group) => {
          group.isOwner = true;
        });
        dispatch(setGroupsOwned(groupsTmp));
        dispatch(sendGroup(groupsTmp)); 

      } else if (access === "member") {
        groupsTmp = groupsTmp.filter((group) =>
          currentUser.subscribedGroups.includes(group["@id"])
        );
        groupsTmp.forEach((group) => {
          group.isMember = true;
        });
        dispatch(setGroupsMember(groupsTmp));
        dispatch(sendGroup(groupsTmp)); 

      } else if (access === "guest") {
        if (currentUser) {
          groupsTmp = groupsTmp.filter(
            (group) =>
              !currentUser.subscribedGroups.includes(group["@id"]) &&
              !currentUser.ownedGroups.includes(group["@id"])
          );
        }
        dispatch(setGroupsAll(groupsTmp));
        dispatch(sendGroup(groupsTmp)); 
      } else {
        if (currentUser) {
          groupsTmp.forEach((group) => {
            group.isMember = currentUser.subscribedGroups.includes(
              group["@id"]
            );
            group.isOwner = currentUser.ownedGroups.includes(group["@id"]);
          });
        }
        dispatch(setGroupsAll(groupsTmp));
        dispatch(sendGroup(groupsTmp)); 

      }
      setGroups(groupsTmp);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    retrieveGroups();
  }, [url, currentUser]);

  if (!groups) {
    return <Loader />;
  }

  if (!groups || groups.length === 0) {
    return <Typography>Aucun groupe trouvé</Typography>;
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid}>
        {groups.map((group, index) => (
          <Grid className={classes.item}>
            <CardGroup
              key={index}
              group={group}
              isGrid={true}
              isDisplayed={false}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GroupsList;
