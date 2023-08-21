import React from "react";

interface ArtistCoverImgProps {
  src: string;
}

function ArtistCoverImg({ src }: ArtistCoverImgProps) {
  return (
    <div className="grid grid-cols-1 mb-8">
      <img src={src} alt="" className="drop-shadow-lg rounded" />
    </div>
  );
}

export default ArtistCoverImg;
