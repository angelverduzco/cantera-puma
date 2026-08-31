import { useMemo } from "react";
import { Link } from "react-router";
import { useFutbolData } from "../../hooks/useFutbol";
import PlayerCard from "../PlayerCard";
import "./FeaturedPlayers.css";

const positionMap = {
  Goalkeeper: "Portero",
  Defender: "Defensa",
  Midfielder: "Medio",
  Attacker: "Delantero",
};

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FeaturedPlayers() {
  const { data, loading, error } = useFutbolData();

  const featured = useMemo(() => {
    if (!data?.plantilla?.[0]?.players) return [];

    const players = data.plantilla[0].players.map((p) => ({
      ...p,
      categoria: positionMap[p.position] || p.position,
    }));

    return shuffleArray(players).slice(0, 4);
  }, [data]);

  return (
    <section
      className="featured-players"
      role="region"
      aria-label="Jugadores destacados"
    >
      <h2>Conoce a los Pumas</h2>
      <p className="featured-subtitle">
        Jugadores que defienden nuestros colores esta temporada
      </p>

      {loading && (
        <p className="featured-players-status">Cargando jugadores...</p>
      )}

      {error && (
        <p className="featured-players-status">
          No se pudieron cargar los jugadores.
        </p>
      )}

      {!loading && !error && featured.length === 0 && (
        <p className="featured-players-status">
          No hay jugadores disponibles en este momento.
        </p>
      )}

      {!loading && !error && featured.length > 0 && (
        <div className="featured-grid" aria-live="polite">
          {featured.map((player) => (
            <PlayerCard key={player.id} player={player} onClick={() => {}} />
          ))}
        </div>
      )}

      <Link
        to="/plantilla"
        className="cta-button"
        aria-label="Ver plantilla completa de Pumas"
      >
        Ver la plantilla
      </Link>
    </section>
  );
}
