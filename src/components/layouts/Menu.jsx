import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { twitch_query_url } from "../../config/keys.js";
import fetchData from "../../services/fetch_Data";

//TODO: REFACTORIZE CODE, SEPARATE STYLES AND MAKE GOOD STYLES, COMPONENTS

export default function Menu() {
  const styles = { textDecoration: "none", color: "inherit" };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "inherit" }}>
        <Toolbar>
          <Typography
            sx={{ fontSize: { xs: "5vw", sm: "1.5vw" } }}
            mr={2}
            color="inherit"
            variant="h5"
          >
            <Link to="/" style={styles}>
              Home
            </Link>
          </Typography>
          {/* <Typography color="inherit" variant="h5">
            <Link to="/some-page-that-not-exist" style={styles}>
              Not found button
            </Link>
          </Typography> */}
          <Search />
        </Toolbar>
      </AppBar>
    </>
  );
}

function Search() {
  const [query, setQuery] = useState(null);
  const [data, setData] = useState([]);

  const fillData = () => {
    const getData = async () => {
      const response = await fetchData(`${twitch_query_url}${query}`);
      console.log(`${twitch_query_url}${query}`);
      setData(await Promise.all(response?.data));
    };
    if (query) getData();
  };

  const handleChange = (e) => {
    setData(null);
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    setData(null);
    setQuery(null);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      setData(null);
    }, 400);
  };

  useEffect(fillData, [query]);

  return (
    <div style={{ width: '50vw',position:'relative' }}>
      <TextField
        sx={{ width: {xs:'70vw',sm:'30vw'} }}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="standard"
        label="Search videogame"
        type={"text"}
      />
      <Box
        sx={{
          maxHeight: 400,
          width: {xs:'70vw',sm:'30vw'},
          overflowY: "auto",
          overflowX: "hidden",
          position: "absolute",
          backgroundColor: "var(--main-background)",
        }}
      >
        {data?.map((item) => {
          return (
            <Link
              onClick={handleClick}
              to={`/vizualize/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RenderRow text={item.name} />
            </Link>
          );
        })}
      </Box>
    </div>
  );
}

function RenderRow({ text }) {
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
