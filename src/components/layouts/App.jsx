import Menu from "./Menu";
import CarouselCard from "./CarouselCard";
import Games from "../common/Games";
import Clips from "./Clips";
import Miniplayer from "../common/Miniplayer";
import { MiniplayerProvider } from "../../context/MiniplayerContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <MiniplayerProvider>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarouselCard />
                <Games />
              </>
            }
          />
          <Route path="/clips/:gameId" element={<Clips />}>
            <Route path=":videoId" element={<Clips />} />
          </Route>
          <Route path="/*" element={<h1>Err 404: Not Found</h1>} />
        </Routes>
        <Miniplayer />
      </Router>
    </MiniplayerProvider>
  );
}
