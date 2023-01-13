import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "../common/Slider";

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column-reverse", sm: "row" },
    backgroundColor: "#f2f2f2",
    padding: 0,
  },
  cardContent: {
    display: "inherit",
    flexDirection: "column",
    justifyContent: "center",
    width: { xs: "100vw", sm: "58vw" },
  },
  cardMedia: {
    width: { xs: "100vw", sm: "40vw" },
    height: { xs: "50vh", sm: "40vw" },
  },
  title: { fontSize: "9vw" },
  secondary: { fontSize: '2vw' , textAlign: "justify" },
};

const CarouselCard = () => {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Typography id="about" variant="h1" sx={styles.title} mb={5}>
          Landy Games
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={styles.secondary}>
          Un sitio web donde puedes buscar los streamers mas populares en
          twitch, las listas de posiciones de juegos con mas viewers o
          simplemente navegar buscando informacion sobre juegos o app
          relevantes.
        </Typography>
      </CardContent>
      <CardMedia sx={styles.cardMedia}>
        <Slider />
      </CardMedia>
    </Card>
  );
};

export default CarouselCard;
