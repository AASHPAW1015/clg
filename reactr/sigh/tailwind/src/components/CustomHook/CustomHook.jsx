import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CustomHook = (url) => {
  const [data, setData] = useLocalStorage("apiData", null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return [data, loading, error];
}

export default CustomHook;
