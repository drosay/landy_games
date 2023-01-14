import Menu from "./Menu";
import CarouselCard from "./CarouselCard";
import Games from "../common/Games";
import Miniplayer from "../common/Miniplayer";
import { MiniplayerProvider } from "../../context/MiniplayerContext";

export default function Home() {
  return (
    <MiniplayerProvider>
      <Menu />
      <CarouselCard />
      <Games />
      <Miniplayer />
    </MiniplayerProvider>
  );
}
