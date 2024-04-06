import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const NotFoundWrapper = styled(Box)({
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fafafa",
});

const NotFoundBackground = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  backgroundColor: "#f44336",
  backgroundImage: "linear-gradient(45deg, #f44336 0%, #ff9800 100%)",
});

const Title = styled(Typography)({
  fontSize: "10rem",
  fontWeight: "bold",
  color: "#4B0082",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
});

const Subtitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#fff",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  marginTop: "1rem",
});

const ButtonWrapper = styled(Box)({
  marginTop: "2rem",
});

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotFoundBackground />
      <Box sx={{ zIndex: 1 }}>
        <Title>404</Title>
        <Subtitle>
          La page que vous recherchez a peut-être été supprimée, son nom a
          peut-être changé ou elle n'est temporairement pas disponible.
        </Subtitle>
        <ButtonWrapper>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ backgroundColor: "#3f51b5", color: "#fff" }}
          >
            Retour à l'accueil
          </Button>
        </ButtonWrapper>
      </Box>
    </NotFoundWrapper>
  );
};

export default NotFound;
