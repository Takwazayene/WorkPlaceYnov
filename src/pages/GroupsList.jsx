import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const GroupsList = ({ groups }) => {
  return (
  
    groups && ( 
    <List>
      {groups.map((group) => (
        <ListItem key={group.id} button>
          <ListItemText primary={group.name} secondary={group.description} />
        </ListItem>
      ))}
    </List>
    )
  );
};

export default GroupsList;
