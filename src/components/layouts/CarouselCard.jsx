import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "../common/Slider";
import styles from "./styles/carousel.module.css";

const CarouselCard = () => {
  return (
    <Card className={styles.carousel__container}>
      <CardContent className={styles.carousel__content}>
        <Typography id="about" variant="h1" className={styles.carousel__title}>
          Landy Games
        </Typography>
        <Typography variant="body1" className={styles.carousel__secondary}>
          Un sitio web donde puedes buscar los streamers mas populares en
          twitch, las listas de posiciones de juegos con mas viewers o
          simplemente navegar buscando informacion sobre juegos o app
          relevantes.
        </Typography>
      </CardContent>
      <CardMedia className={styles.carousel__media}>
        <Slider />
      </CardMedia>
    </Card>
  );
};

export default CarouselCard;
