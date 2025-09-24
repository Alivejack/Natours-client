import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axios.get(url, { signal: controller.signal });
        setData(res.data?.doc || res.data);
      } catch (err) {
        if (err.name === 'CanceledError') return;
        if (err.name === 'AxiosError') return setError(err.response.data.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
