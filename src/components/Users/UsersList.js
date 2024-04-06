import React, { useState, useEffect } from 'react';
import axios from "axios";
import { List } from '@mui/material';
import UserItem from './UserItem';


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <List>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </List>
  );
}

export default UserList;
