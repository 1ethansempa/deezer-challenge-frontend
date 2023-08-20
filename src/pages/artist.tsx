import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { Loader } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Artist } from "../types/artist";
import { Track } from "../types/track";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import axios from "axios";
import {
  convertSecondsToDuration,
  formatNumberWithCommas,
} from "../utils/helpers";
import { BadgeCheck } from "lucide-react";
import { Album } from "../types/album";

function ArtistPage() {
  const { id } = useParams();

  const [artist, setArtist] = useState<Artist>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsToShow, setAlbumsToShow] = useState<Album[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const darkMode = useSelector((state: RootState) => state.mode.darkMode);

  const fetchArtist = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/deezer/artist/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data) {
        setArtist(response.data);
      }
    } catch (error: any) {
      setError("Something went wrong");
    }
  };

  const fetchTopTracks = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/deezer/artist/${id}/top-tracks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setTracks(response.data);
      }
    } catch (error: any) {
      setError("Something went wrong");
    }
  };

  const fetchAlbums = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/deezer/artist/${id}/albums`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setAlbums(response.data);

        setAlbumsToShow(response.data.slice(0, 5));
      }
    } catch (error: any) {
      setError("Something went wrong");
    }
  };

  const fetchArtistDetails = useCallback(async (id: string) => {
    setFetching(true);
    await Promise.all([fetchArtist(id), fetchTopTracks(id), fetchAlbums(id)]);
    setFetching(false);
  }, []);

  useEffect(() => {
    fetchArtistDetails(id);
  }, [fetchArtistDetails, id]);

  return (
    <MainLayout>
      <div>
        {fetching ? (
          <div className="flex justify-center items-center">
            <Loader color={darkMode ? "#FAFAFA" : "#0E0F09"} size={64} />
          </div>
        ) : error !== "" ? (
          <div className="flex justify-center items-center">
            <h2 className="text-4xl">
              Something went wrong when fetching this artists's info
            </h2>
          </div>
        ) : (
          <div className="lg:px-12 md:px-8 px-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
              <div className="grid grid-cols-1 mb-8">
                <img
                  src={artist.picture_big}
                  alt=""
                  className="drop-shadow-lg rounded"
                />
              </div>
              <div>
                <div className="mt-6 flex justify-between items-center">
                  <h2 className="md:text-4xl text-2xl flex items-center font-bold ">
                    <span className="mr-4 border-b-4 border-custom-yellow">
                      {artist.name}
                    </span>
                    <BadgeCheck />
                  </h2>
                  <p className="text-2xl">
                    {formatNumberWithCommas(artist.nb_fan)} fans
                  </p>
                </div>
                <div>
                  <div className="flex-start font-medium flex text-4xl mb-3 mt-6">
                    Most Popular Tracks
                  </div>
                  {tracks.length > 0 ? (
                    <>
                      {tracks.map((track, index) => {
                        return (
                          <div
                            key={index}
                            className="grid md:grid-cols-3 grid-cols-2 w-full px-0 p-4 border-b border-light-gray dark:border-subtle-white text-primary-black dark:text-zinc-50"
                          >
                            <div className="flex">
                              <div className="mr-3">{index + 1}</div>
                              <div>
                                <img
                                  src={track.album.cover_medium}
                                  className="lg:h-20 md:h-32 h-40  shadow-lg rounded"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="flex flex-col md:px-0 px-6">
                              <div className="font-bold">{track.title}</div>
                              <Link to={`/artist/${track.artist.id}`}>
                                <div className="text-sm  mt-2 text-primary-black dark:text-gray-300">
                                  {track.explicit_lyrics ? (
                                    <span className="mr-2 text-primary-black shadow-sm bg-gray-300 font-semibold py-1 px-2 rounded">
                                      E
                                    </span>
                                  ) : null}
                                  <span className="hover:underline">
                                    {track.artist.name}
                                  </span>
                                </div>
                              </Link>
                              <div className="block md:hidden mt-4">
                                {convertSecondsToDuration(track.duration)}
                              </div>
                            </div>

                            <div className="text-center hidden md:block">
                              {convertSecondsToDuration(track.duration)}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="flex justify-between mb-5">
                <h2 className="text-4xl font-medium">Albums</h2>
                <button
                  className="underline"
                  onClick={() => setAlbumsToShow(albums)}
                >
                  See All
                </button>
              </div>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8">
                {albumsToShow.map((album, index) => {
                  return (
                    <div className="flex flex-col mb-5" key={index}>
                      <img
                        src={album.cover_medium}
                        className="shadow-lg rounded"
                        alt=""
                      />
                      <h4 className="font-semibold">{album.title}</h4>
                      <p>{new Date(album.release_date).getFullYear()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ArtistPage;
