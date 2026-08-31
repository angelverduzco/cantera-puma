import { useState, useEffect } from "react";
import { cachedFetch } from "./useFetchCache";

export function useCalendario() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await cachedFetch("/api/ligamx");

        if (!controller.signal.aborted) {
          if (result.success && result.data && result.data.length > 0) {
            setMatches(result.data);
          } else {
            throw new Error("Datos vacíos del API");
          }
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          console.error("Error al cargar el calendario:", err.message);
          setError("No se encontraron los datos");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMatches();
    return () => controller.abort();
  }, []);

  return { matches, loading, error };
}
