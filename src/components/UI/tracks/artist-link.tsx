import React from "react";
import { Link } from "react-router-dom";
import ExplicitMark from "./explicit-mark";

interface ArtistLinkProps {
  artistId: number;
  explicit: boolean;
  artistName: string;
}

function ArtistLink({ artistId, explicit, artistName }: ArtistLinkProps) {
  return (
    <Link to={`/artist/${artistId}`} data-cy="artist-link">
      <div className="text-sm  mt-2 md:px-0 px-4 text-primary-black dark:text-gray-300">
        <ExplicitMark explicit={explicit} />
        <span className="hover:underline">{artistName}</span>
      </div>
    </Link>
  );
}

export default ArtistLink;
