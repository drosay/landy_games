import { useState, useContext, createContext, useMemo } from "react";

const MiniplayerContext = createContext();

function MiniplayerProvider(props) {
  const [videoId, setVideoId] = useState(null);

  const value = useMemo(
    () => ({
      videoId,
      setVideoId,
    }),
    [videoId]
  );

  return <MiniplayerContext.Provider value={value}>
    {props.children}
  </MiniplayerContext.Provider>
}

function useMiniplayerContext() {
  const context = useContext(MiniplayerContext);

  return context
    ? context
    : "Debes estar dentro del proveedor de el MiniplayerContext";
}

export { MiniplayerProvider, useMiniplayerContext };
