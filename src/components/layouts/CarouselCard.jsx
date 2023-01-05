import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "../common/Slider";

const CarouselCard = () => {
  const styles = {
    cardStyle: {
      display: "flex",
      justifyContent:'space-between',
      flexDirection: { xs: "column-reverse", sm: "row" },
      backgroundColor: "#f2f2f2",
      padding: 0,
    },
    cardContentStyle: {
      display: "inherit",
      flexDirection: "column",
      justifyContent: "center",
      width: { xs: "100vw", sm: "58vw" },
    },
    cardMediaStyle: {
      width: { xs: "100vw", sm: "40vw" },
    },
    titleStyle: {fontSize: { xs: "3rem", sm: "10rem" } },
    secondaryStyle: { fontSize: { xs: "1", sm: "3rem" }, textAlign: "justify" },
  };

  return (
    <Card sx={styles.cardStyle}>
      <CardContent sx={styles.cardContentStyle}>
        <Typography id='about' variant="h1" sx={styles.titleStyle} mb={5}>
          Landy Games
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={styles.secondaryStyle}
        >
          Un sitio web donde puedes buscar los streamers mas populares en
          twitch, las listas de posiciones de juegos con mas viewers o
          simplemente navegar buscando informacio sobre juegos o app relevantes.
        </Typography>
      </CardContent>
      <CardMedia sx={styles.cardMediaStyle}>
        <Slider />
      </CardMedia>
    </Card>
  );
};

export default CarouselCard;
