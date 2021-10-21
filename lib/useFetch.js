import { useEffect, useState } from "react";

import { useFormat } from "./useFormat";

export const useFetch = (url, setState, isFromatting) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (response.status !== 200) {
          setError(new Error(`API Error: status code ${response.status}`));
        } else {
          const json = await response.json();
          if(isFromatting){
            setData(useFormat(json));
            setState(useFormat(json))
          }
          else{
            setData(json);
            setState(json)
          }     
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => ac.abort();
  }, [url]);
  return { loading, error, data };
};
