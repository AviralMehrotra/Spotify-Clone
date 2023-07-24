import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";
import { reducerCases } from "../utils/Constnts";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2] && track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  const playTrack = async (
    id,
    name,
    artist,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artist,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
  };
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">
                <strong>Playlist</strong>
              </span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" className="trackImage" />
                          <div className="overlay">
                            <div className="ico">
                              <BsFillPlayFill />
                            </div>
                          </div>
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      width: 15rem;
      height: 15rem;
      overflow: hidden;
      // box-shadow: rgba(255, 255, 255, 0.5) 25px 25px 50px -12px;
      -webkit-box-shadow: 13px 13px 62px -9px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 13px 13px 62px -9px rgba(0, 0, 0, 0.75);
      box-shadow: 13px 13px 62px -9px rgba(0, 0, 0, 0.75);
      border-radius: 0.5rem;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      color: #e0dede;
      .title {
        color: #fff;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3.05fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 0.3rem;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          .image {
            position: relative;
            text-align: center;
            overflow: hidden;
            display: inline-block;
            max-height: 40px;
            max-width: 40px;
          }
          .image * {
            box-sizing: border-box;
            transition: 0.05s ease-in-out;
          }
          .image .trackImage {
            vertical-align: top;
            max-width: 100%;
            backface-visibility: hidden;
          }
          .image .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            align-items: center;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            opacity: 0;
            z-index: 2;
            font-size: 1.3rem;
          }
          .ico {
            color: white;
          }
        }
        .col:hover .trackImage {
          opacity: 0.4;
        }
        .col:hover .overlay {
          opacity: 1;
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
