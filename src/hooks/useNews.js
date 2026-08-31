import { useState, useEffect } from "react";
import { cachedFetch } from "./useFetchCache";

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        setLoading(true);
        const result = await cachedFetch("/api/news");

        if (!controller.signal.aborted) {
          setNews(result);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchNews();
    return () => controller.abort();
  }, []);

  return { news, loading, error };
}
