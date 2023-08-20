import React, { useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { Search } from "lucide-react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import { convertSecondsToDuration } from "../utils/helpers";
import { Track } from "../types/track";

function Home() {
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

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      await fetchTracks();
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center px-24">
        <div className="mb-8">Discover songs</div>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search For Tracks"
            className="w-full py-6 px-8 bg-transparent rounded-[10rem] border-2 border-primary-black dark:border-zinc-50 text-primary-black dark:text-zinc-50 outline-none shadow-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="absolute inset-y-0 right-4 flex items-center pr-3"
            onClick={fetchTracks}
          >
            <Search color={darkMode ? "#FAFAFA" : "#0E0F09"} size={24} />
          </button>
        </div>
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
        <div className="mt-6 px-24">
          {tracks.length > 0 ? (
            <>
              <div className="flex-start uppercase flex text-4xl mb-3">
                Tracks
              </div>
              <div className="grid grid-cols-4 mb-6 ">
                <div>#</div>

                <div>Title</div>
                <div className="text-center">Album</div>
                <div className="text-center">Duration</div>
              </div>
              {tracks.map((track, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 w-full px-0 p-4 border-b border-light-gray dark:border-subtle-white text-primary-black dark:text-zinc-50"
                >
                  <div className="flex">
                    <div className="mr-3">{index + 1}</div>
                    <div>
                      <img
                        src={track.album.cover}
                        className="h-20 shadow-lg rounded"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-2xl">{track.title}</div>
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
                  </div>
                  <Link to="#">
                    <div className="text-center hover:underline">
                      {track.album.title}
                    </div>
                  </Link>

                  <div className="text-center">
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

export default Home;
