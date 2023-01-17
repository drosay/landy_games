import { useState, useContext, createContext, useMemo } from "react";
//Trying Chatgpt comments

//create the context for the mini player
const MiniplayerContext = createContext();

//create the provider component that will wrap the components that needs to access the mini player's context
function MiniplayerProvider(props) {
  //state to hold the videoId
  const [gameId, setGameId] = useState(null);

  const removeGameId = () =>{
    setGameId(null)
  }

  //create the context value object with the videoId and setVideoId function
  const value = useMemo(
    () => ({
      gameId,
      setGameId,
      removeGameId
    }),
    [gameId]
  );

  //return the provider with the value object
  return (
    <MiniplayerContext.Provider value={value}>
      {props.children}
    </MiniplayerContext.Provider>
  );
}

//custom hook to access the context
function useMiniplayerContext() {
  //get the context
  const context = useContext(MiniplayerContext);

  //return the context or a message if it's not available
  return context
    ? context
    : "You must be inside the MiniplayerContext provider";
}

//export the provider and the custom hook
export { MiniplayerProvider, useMiniplayerContext };
