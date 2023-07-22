import React, { useEffect } from "react";
import Login from "./components/Login.jsx";
import { useStateProvider } from "./utils/stateProvider";
import { reducerCases } from "./utils/Constnts.js";
import Spotify from "./components/Spotify.jsx";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [dispatch, token]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
