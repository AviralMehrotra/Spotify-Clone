import React from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constnts";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
// import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
// import { FiRepeat } from "react-icons/fi";
import { LuRepeat } from "react-icons/lu";

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2] && item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  };
  const changeState = async (type) => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <BiSkipPrevious onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <BiSkipNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <LuRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
      font-size: 2.5rem;
      &:hover {
        color: #1db954;
      }
    }
  }
  .previous,
  .next {
    font-size: 2rem;
  }
`;
