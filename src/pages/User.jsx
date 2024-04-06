import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Grid, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  groupList: {
    margin: "10px 0",
  },
  userInfo: {
    margin: "2px 0",
  },
}));

function User() {
  const { userId } = useParams();
  const classes = useStyles();

  // Waiting API connexion, we use the data available on the api docs
  // http://82.65.6.187:8002/api/docs
  const apiResponse = {
    "@context": "/api/contexts/User",
    "@id": "/api/users/1",
    "@type": "User",
    id: 1,
    email: "user@example.com",
    ownedGroups: ["/api/groups/1", "/api/groups/2"],
    subscribedGroups: ["/api/groups/1"],
    nickname: "User A",
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="div">
        Détails de l'utilisateur : {apiResponse.nickname}
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
        <Box flexGrow={1} mr={{ sm: 2 }} mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h6" component="div" className={classes.userInfo}>
            {apiResponse.nickname}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className={classes.userInfo}
          >
            {apiResponse.email}
          </Typography>
        </Box>
        <Box flexGrow={1} ml={{ sm: 2 }}>
          <Grid container className={classes.groupList}>
            <Grid item xs={12}>
              <Typography variant="body2" component="div">
                Groupes créés:
                {apiResponse.ownedGroups.map((g) => g)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" component="div">
                Groupes abonnés:
                {apiResponse.subscribedGroups.map((g) => g)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default User;
