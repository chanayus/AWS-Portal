import fetch from "isomorphic-unfetch"
import { useEffect } from "react";
import { useFormat } from "./useFormat";
import { useStateIfMounted } from "use-state-if-mounted";

export const useFetch = (url, setState, isFromatting) => {
  const [loading, setLoading] = useStateIfMounted(false);
  const [error, setError] = useStateIfMounted(null);
  const [data, setData] = useStateIfMounted([]);
  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {signal: abortController.signal});
        if (response.status !== 200) {
          setError(new Error(`API Error: status code ${response.status}`));
        } else {
          const json = await response.json();
          if (isFromatting) {
            const dataFormatted = useFormat(json)
            setData(dataFormatted);
            setState(dataFormatted);
          } else {
            setData(json);
            setState(json);
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { loading, error, data };
};
