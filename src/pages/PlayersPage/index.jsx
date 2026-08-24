import "./PlayersPage.css";
import { useState, useMemo } from "react";
import PlayerCard from "../../components/PlayerCard";
import PlayerModal from "../../components/PlayerModal";
import { useFutbolData } from "../../hooks/useFutbol";
import LoadingState from "../../components/LoadingState";
import useHead from "../../hooks/useHead";

// Mapeo de posiciones de API-Sports a español
const positionMap = {
  Goalkeeper: "Portero",
  Defender: "Defensa",
  Midfielder: "Medio",
  Attacker: "Delantero",
};

export default function PlayersPage() {
  useHead({
    title: "Plantilla Oficial Pumas UNAM 2026",
    description:
      "Conoce la plantilla oficial del Club Universidad Nacional: jugadores, posiciones y fichas del primer equipo.",
    path: "/plantilla",
  });

  const { data, loading, error } = useFutbolData();
  const [filter, setFilter] = useState("Todos");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const positions = ["Todos", "Portero", "Defensa", "Medio", "Delantero"];

  const players = useMemo(() => {
    if (!data?.plantilla?.[0]?.players) return [];

    return data.plantilla[0].players.map((p) => ({
      ...p,
      categoria: positionMap[p.position] || p.position,
    }));
  }, [data]);

  const filteredPlayers =
    filter === "Todos"
      ? players
      : players.filter((p) => p.categoria === filter);

  const openModal = (player) => {
    setSelectedPlayer(player);
    document.body.style.overflow = "hidden"; // bloquea scroll
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    document.body.style.overflow = "auto"; // restaura scroll
  };

  if (loading) {
    return (
      <main className="players-container">
        <LoadingState message="Cargando plantilla oficial..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="players-container">
        <section className="players-hero">
          <h2>Plantilla Oficial Pumas UNAM</h2>
          <p>
            Conoce a los jugadores que defienden nuestros colores esta temporada
          </p>
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#122245",
              background:
                "linear-gradient(120deg, rgba(18, 34, 69, 1) 20%, rgba(187, 164, 90, 1) 100%)",
              padding: "3rem",
              borderRadius: "15px",
              textAlign: "center",
              width: "100%",
              maxWidth: "800px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                color: "#bba45a",
                fontSize: "2rem",
                marginBottom: "1rem",
              }}
            >
              ¡Aviso!
            </h3>
            <p style={{ color: "#e0e0e0", fontSize: "1.2rem", margin: 0 }}>
              No se encontraron los datos.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="players-container">
      <section className="players-hero">
        <h2>Plantilla Oficial Pumas UNAM</h2>
        <p>
          Conoce a los jugadores que defienden nuestros colores esta temporada
        </p>
      </section>

      <nav className="filters" aria-label="Filtro de posiciones">
        {positions.map((pos) => (
          <button
            key={pos}
            className={`filter-btn ${filter === pos ? "active" : ""}`}
            aria-label={`Filtrar por posición: ${pos}`}
            aria-pressed={filter === pos}
            onClick={() => setFilter(pos)}
          >
            {pos}
          </button>
        ))}
      </nav>

      <div className="players-grid" role="region" aria-live="polite">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard
              player={player}
              key={player.id}
              onClick={() => openModal(player)}
            />
          ))
        ) : (
          <p className="empty-state">
            No hay jugadores disponibles para esta posición.
          </p>
        )}
      </div>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={closeModal} />
      )}
    </main>
  );
}
