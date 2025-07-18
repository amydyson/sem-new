import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh", // subtract navbar height (default AppBar is 64px)
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        border: "10px solid black",
      }}
    >
      <Typography sx={{ border: "10px solid red" }} variant="h3">
        Welcome to the Home Page
      </Typography>
    </Box>
  );
};

export default Home;
