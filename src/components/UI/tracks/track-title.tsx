import React from "react";

interface TrackTitleProps {
  title: String;
}

function TrackTitle({ title }: TrackTitleProps) {
  return (
    <div className="font-bold text-2xl  md:px-0 px-4" data-cy="track-title">
      {title}
    </div>
  );
}

export default TrackTitle;
