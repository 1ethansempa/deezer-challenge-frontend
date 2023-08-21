import { BadgeCheck } from "lucide-react";
import React from "react";

interface ArtistHeaderProps {
  artistName: string;
}

function ArtistHeader({ artistName }: ArtistHeaderProps) {
  return (
    <h2 className="md:text-4xl text-2xl flex items-center font-bold ">
      <span className="mr-4 border-b-4 border-custom-yellow">{artistName}</span>
      <BadgeCheck />
    </h2>
  );
}

export default ArtistHeader;
