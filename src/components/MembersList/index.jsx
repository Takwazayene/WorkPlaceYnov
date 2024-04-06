import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from '@mui/icons-material/People';

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
    borderColor: "#3f51b5",
    margin: 0,
    padding: 0,
  },
  listItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderColor: "#3f51b5",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    "& h3": {
      margin: 0,
      fontSize: "18px",
      fontWeight: 500,
    },
    "& span": {
      marginLeft: "10px",
      color: "gray",
    },
  },
  noMember: {
    fontSize: "18px",
    margin: "20px 0",
  },
}));

function MembersList({ groupId, owner }) {
  const classes = useStyles();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const base_url = "http://127.0.0.1:8000";
  const url = `${base_url}/api/groups`;
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${url}/${groupId}/members`);
        const membersTmp = response.data["hydra:member"];
        membersTmp.forEach((member) => {
          member.isOwner = member["@id"] === owner;
        });
        console.log(membersTmp);
        setMembers(membersTmp);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        Membres
        <PeopleIcon />
      </h3>
      {members.length > 0 ? (
        <ul className={classes.list}>
          {members.map((member) => (
            <li key={member.id} className={classes.listItem}>
              <h3>{member.nickname}</h3>
              {member.isOwner && <span>(admin)</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className={classes.noMember}>Aucun membre</p>
      )}
    </div>
  );
}

export default MembersList;
