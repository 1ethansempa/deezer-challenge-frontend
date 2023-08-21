import React, { useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import { convertSecondsToDuration } from "../utils/helpers";
import { Track } from "../types/track";
import SearchBar from "../components/search-bar";
import AlbumCover from "../components/UI/tracks/album-cover";
import TrackTitle from "../components/UI/tracks/track-title";
import ArtistLink from "../components/UI/tracks/artist-link";

function HomePage() {
  const darkMode = useSelector((state: RootState) => state.mode.darkMode);
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchTracks = async () => {
    try {
      setError("");
      setFetching(true);
      setTracks([]);
      if (query === "") {
        setError("Please enter a search query");
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/deezer/search?q=${query}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          console.log(response.data);

          setTracks(response.data);
        }
      }

      setFetching(false);
    } catch (error: any) {
      setError("Something went wrong");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center lg:px-24 md:px-16 px-4">
        <div className="mb-8">Discover songs</div>
        <SearchBar
          value={query}
          action={fetchTracks}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <div className="mt-8 text-primary-black dark:text-zinc-50">{error}</div>

        <div className="mt-12">
          {fetching ? (
            <Loader color={darkMode ? "#FAFAFA" : "#0E0F09"} size={64} />
          ) : (
            <></>
          )}
        </div>
      </div>

      {!fetching && (
        <div className="mt-6 lg:px-24 md:px-16 px-4">
          {tracks.length > 0 ? (
            <>
              <div className="hidden lg:block">
                <div className="flex-start uppercase flex text-4xl mb-3">
                  Tracks
                </div>
                <div className="grid grid-cols-4 mb-6 ">
                  <div>#</div>

                  <div>Title</div>
                  <div className="lg:text-center text-left ">Album</div>
                  <div className="text-center">Duration</div>
                </div>
              </div>

              {tracks.map((track, index) => (
                <div
                  key={index}
                  className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full px-0 p-4 border-b border-light-gray dark:border-subtle-white text-primary-black dark:text-zinc-50"
                >
                  <div className="flex">
                    <div className="mr-3">{index + 1}</div>
                    <AlbumCover src={track.album.cover_medium} />
                  </div>
                  <div className="flex flex-col">
                    <TrackTitle title={track.title} />
                    <ArtistLink
                      artistId={track.artist.id}
                      explicit={track.explicit_lyrics}
                      artistName={track.artist.name}
                    />
                    <div className="md:px-0 px-4 block lg:hidden">
                      {convertSecondsToDuration(track.duration)}
                    </div>
                  </div>
                  <Link to="#" className="hidden lg:block">
                    <div className="text-center hover:underline">
                      {track.album.title}
                    </div>
                  </Link>

                  <div className="text-center hidden lg:block">
                    {convertSecondsToDuration(track.duration)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h2>No Tracks Found</h2>
          )}
        </div>
      )}
    </MainLayout>
  );
}

export default HomePage;
