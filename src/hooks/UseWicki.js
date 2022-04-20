import { useState, useEffect } from 'react';

function useWicki(artistName) {
  const [wickiContent, setWickiContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWickiArtistContent();
  }, []);

  const getWickiArtistContent = async () => {
    const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${artistName}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { pages } = data.query;
        setWickiContent(Object.keys(pages).map(id => pages[id].extract));
        setIsLoading(false);
      })
      .catch(e => console.log(e));
  };

  return wickiContent;
}

export default useWicki;
