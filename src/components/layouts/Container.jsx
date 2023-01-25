import { Card, CardContent, CardMedia } from "@mui/material";
import styles from "./styles/container.module.css";

function Container(props) {
  return (
    <Card className={`${styles.container} ${props.nstyles}`}>
      {props.children}
    </Card>
  );
}

function Content(props) {
  return (
    <CardContent className={`${styles.container__content} ${props.nstyles}`}>
      {props.children}
    </CardContent>
  );
}

function Media(props) {
  return (
    <CardMedia className={`${styles.container__media} ${props.nstyles}`}>
      {props.children}
    </CardMedia>
  );
}

export { Container, Content, Media };
