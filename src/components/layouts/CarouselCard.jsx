import { Container, Content, Media } from "./Container";
import Slider from "../common/Slider";
import Typography from "@mui/material/Typography";
import carousel from "./styles/carousel.module.css";

export default function CarouselCard() {
  return (
    <Container>
      <Content>
        <Typography
          id="about"
          variant="h1"
          className={carousel.carousel__title}
        >
          Landy Games
        </Typography>
        <Typography variant="body1" className={carousel.carousel__secondary}>
          Un sitio web donde puedes buscar los streamers mas populares en
          twitch, las listas de posiciones de juegos con mas viewers o
          simplemente navegar buscando informacion sobre juegos o app
          relevantes.
        </Typography>
      </Content>
      <Media>
        <Slider />
      </Media>
    </Container>
  );
}
