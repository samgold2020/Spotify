import React, { useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";

const Artist = ({ state }) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.detail);
  });

  return (
    <div>
      <h1>This is the artist!!!</h1>
    </div>
  );
};

export default Artist;
