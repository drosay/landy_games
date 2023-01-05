import { AppBar, Toolbar, Typography } from "@mui/material";

const Menu = () => {
  return (
    <>
      <AppBar position='static' sx={{backgroundColor:'inherit'}}>
        <Toolbar>
          <Typography mr={2} color='inherit' variant='h5' component='a' href="#about" sx={{
            textDecoration: 'none'
          }}>
            About
          </Typography>
          <Typography color='inherit' variant='h5' component='a' href="#games" sx={{
            textDecoration: 'none'
          }}>
            Games
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Menu;
