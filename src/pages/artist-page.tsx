import React, { useCallback, useEffect, useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { Loader } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ExtendedArtist } from "../types/artist";
import { ExtendedTrack } from "../types/track";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import axios from "axios";
import {
  convertSecondsToDuration,
  formatNumberWithCommas,
} from "../utils/helpers";
import { ExtendedAlbum } from "../types/album";
import ArtistLink from "../components/UI/tracks/artist-link";
import AlbumCover from "../components/UI/tracks/album-cover";
import ArtistHeader from "../components/artist-header";
import ArtistAlbum from "../components/artist-album";
import ArtistCoverImg from "../components/artist-cover-img";

function ArtistPage() {
  const { id } = useParams();

  const [artist, setArtist] = useState<ExtendedArtist>(null);
  const [tracks, setTracks] = useState<ExtendedTrack[]>([]);
  const [albums, setAlbums] = useState<ExtendedAlbum[]>([]);
  const [albumsToShow, setAlbumsToShow] = useState<ExtendedAlbum[]>([]);
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
              <ArtistCoverImg src={artist.picture_big} />
              <div>
                <div className="mt-6 flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start">
                  <ArtistHeader artistName={artist.name} />
                  <p className="text-2xl md:mt-0 mt-3">
                    {formatNumberWithCommas(artist.nb_fan)} fans
                  </p>
                </div>
                <div>
                  <div className="flex-start font-medium flex md:text-4xl text-2xl mb-3 mt-6">
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
                              <AlbumCover src={track.album.cover_medium} />
                            </div>
                            <div className="flex flex-col md:px-0 px-6">
                              <div className="font-bold">{track.title}</div>
                              <ArtistLink
                                artistId={track.artist.id}
                                explicit={track.explicit_lyrics}
                                artistName={track.artist.name}
                              />
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
                    <ArtistAlbum
                      key={index}
                      src={album.cover_medium}
                      title={album.title}
                      releaseDate={album.release_date}
                    />
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
