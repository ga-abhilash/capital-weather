import React, {useEffect, useState} from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState({response: null, isLoading: true});

  useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then(res => {
          setResponse({response: res, isLoading: false})
        })
        .catch(err => {
          setResponse({response: false, isLoading: false})
        })

  }, [url]);

  return response;
};

export default useFetch;
