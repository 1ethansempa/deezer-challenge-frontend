import React from "react";

interface AlbumCoverProps {
  src: string;
}

function AlbumCover({ src }: AlbumCoverProps) {
  return <img src={src} className="lg:h-20 h-32 shadow-lg rounded" alt="" />;
}

export default AlbumCover;
