import React from "react";

const CLIENT_ID = "7e36f2d84e53488fb922004cd1a7456a";
const SPOTIFY_AUTHORIZE_BASEURL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3001/Splash";
const SCOPES = [`user-top-read, user-read-email`];
const SPACE_DELIMITER = "$20";
const SCOPE_SPACES_URL = SCOPES.join(SPACE_DELIMITER);
export default function Home() {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_BASEURL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE_SPACES_URL}&response_type=token&show_dialogue=true`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
