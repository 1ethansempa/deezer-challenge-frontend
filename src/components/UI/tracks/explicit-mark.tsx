import React from "react";

interface ExplicitMarkProps {
  explicit: boolean;
}

function ExplicitMark({ explicit }: ExplicitMarkProps) {
  return (
    <>
      {explicit ? (
        <span className="mr-2 text-primary-black shadow-sm bg-gray-300 font-semibold py-1 px-2 rounded">
          E
        </span>
      ) : null}
    </>
  );
}

export default ExplicitMark;
