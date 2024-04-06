import React from "react";
import { ListItem, ListItemText } from "@mui/material";

function UserItem({ user }) {
  return (
    <ListItem>
      <ListItemText primary={user.nickname} />
    </ListItem>
  );
}

export default UserItem;
