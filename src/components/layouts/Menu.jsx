import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = () => {
  const styles = { textDecoration: "none", color: "inherit" };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "inherit" }}>
        <Toolbar>
          <Typography mr={2} color="inherit" variant="h5">
            <Link to="/" style={styles}>Home</Link>
          </Typography>
          <Typography color="inherit" variant="h5">
            <Link to="/Clips" style={styles}>Clips</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Menu;
