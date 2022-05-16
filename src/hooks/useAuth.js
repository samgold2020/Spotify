import { useState, useEffect } from 'react';

function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    setLocalStorage();
  }, []);

  /*
  Helper function to get Access Token from a successful redirect: 
    1. By accessing the returned url with access token, expiry, and token type contained.
    2. Return a URLSearchParams object from the hash string
    3. Destructure the new Object and set local storage
  */
  function getRedirectAuthParams(hash) {
    const stringAfterHash = hash.substring(1);
    const params = Object.fromEntries(new URLSearchParams(stringAfterHash));
    return params;
  }

  const setLocalStorage = () => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getRedirectAuthParams(
        window.location.hash,
      );
      localStorage.setItem('Access_Token', access_token);
      localStorage.setItem('Token_Type', token_type);
      localStorage.setItem('Expiers_In', expires_in);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('Access_Token'));
    if (token) {
      setIsAuth(true);
    }
  }, [token]);

  return { isAuth, token };
}

export default useAuth;
