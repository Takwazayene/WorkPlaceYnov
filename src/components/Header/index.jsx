import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const ENDPOINT = "http://127.0.0.1:4001";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "1.5rem",
    color: "white",
    padding: theme.spacing(1),
  },
  icon: {
    fontSize: "2rem",
    style: "none",
    borderRadius: "50%",
    padding: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    borderRadius: "50%",
    padding: theme.spacing(1),
    color: "white",
    backgroundColor: "#3f51b5",
    "&:hover": {
      backgroundColor: "#1a237e",
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("user logout", { id: loggedUser.id, username: loggedUser.nickname });

    localStorage.removeItem("TOKEN");
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      {!localStorage.getItem("TOKEN") && (
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            component={Link}
            to="/"
            style={{ flexGrow: 1 }}
          >
            Workplace Ynov
          </Typography>
          <Button component={Link} to="/login" color="inherit">
            Connexion
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Inscription
          </Button>
        </Toolbar>
      )}

      {localStorage.getItem("TOKEN") && (
        <Toolbar>
          <Typography
            className={classes.title}
            component={Link}
            to="/"
            variant="h6"
            style={{ flexGrow: 1 }}
          >
            Workplace Ynov
          </Typography>
          <Button
            className={classes.menuButton}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            data-testid="settings-menu"
          >
            <MenuIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/profil">
              <HomeIcon className={classes.icon} />
              Profil
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/userList">
              <HomeIcon className={classes.icon} />
              Utilisateurs
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose} component={Link} to="/groups">
              <HomeIcon className={classes.icon} />
              Groupes
            </MenuItem> */}
            <MenuItem onClick={handleLogout}  data-testid="logout-option">
              <ExitToApp className={classes.icon}/>
              Déconnexion
            </MenuItem>
          </Menu>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
