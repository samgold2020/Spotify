import axios from 'axios';
import { useState, useEffect } from 'react';

function useWicki(artistName) {
  const [wickiContent, setWickiContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWickiArtistContent();
  }, []);

  const getWickiArtistContent = async () => {
    try {
      let res = await axios({
        url: `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${artistName}`,
        method: 'get',
      });
      if (res) {
        const { pages } = res?.data?.query;
        setWickiContent(
          Object.keys(pages).map(id =>
            pages[id]?.extract?.length
              ? Object.keys(pages).map(id => pages[id].extract)
              : `We couldn't find any data on this musician/group. Maybe you've discovered the next big thing!`,
          ),
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Use Wicki Error', err);
    }
  };

  return { wickiContent, isLoading };
}

export default useWicki;
