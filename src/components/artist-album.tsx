import React from "react";

interface ArtistAlbumProps {
  src: string;
  title: string;
  releaseDate: string;
}

function ArtistAlbum({ src, title, releaseDate }: ArtistAlbumProps) {
  return (
    <div className="flex flex-col mb-5">
      <img src={src} className="shadow-lg rounded" alt="" />
      <h4 className="font-semibold">{title}</h4>
      <p>{new Date(releaseDate).getFullYear()}</p>
    </div>
  );
}

export default ArtistAlbum;
