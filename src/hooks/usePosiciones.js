import { useState, useEffect } from "react";
import { cachedFetch } from "./useFetchCache";

export function usePosiciones() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await cachedFetch("/api/posiciones");

        if (!controller.signal.aborted) {
          if (result.success && result.data && result.data.length > 0) {
            setData(result.data);
          } else {
            throw new Error("Datos vacíos del API");
          }
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          console.error("Error al cargar las posiciones:", err.message);
          setError("No se encontraron los datos");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchStandings();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
