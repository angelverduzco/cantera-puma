import "./CalendarioPage.css";
import { useCalendario } from "../../hooks/useCalendario";
import LoadingState from "../../components/LoadingState";

export default function CalendarioPage() {
  const { matches, loading, error } = useCalendario();

  if (loading) {
    return (
      <main className="calendario-container">
        <LoadingState message="Cargando el calendario..." />
      </main>
    );
  }

  if (error || !matches || matches.length === 0) {
    return (
      <main className="calendario-container">
        <section className="calendario-hero">
          <h2>Calendario Clausura 2026</h2>
          <p>Sigue todos los resultados y próximos partidos de Pumas UNAM.</p>
        </section>
        <section className="calendario-content">
          <div className="calendario-grid" style={{ display: "block" }}>
            <article
              className="match-card"
              style={{ textAlign: "center", padding: "4rem 2rem" }}
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
            </article>
          </div>
        </section>
      </main>
    );
  }

  // Encontrar el índice del primer partido futuro (el inmediato siguiente)
  const firstFutureIndex = matches.findIndex((match) => {
    const score = match.marcador || match.resultado || "";
    return !(score !== "Próximo" && score.includes("-"));
  });

  return (
    <main className="calendario-container">
      <section className="calendario-hero">
        <h2>Calendario Clausura 2026</h2>
        <p>Sigue todos los resultados y próximos partidos de Pumas UNAM.</p>
      </section>

      <section className="calendario-content">
        <div className="calendario-grid">
          {matches.map((match, index) => {
            const home =
              match.local ||
              (match.condicion === "Local" ? "Pumas" : match.rival);
            const away =
              match.visita ||
              (match.condicion === "Visitante" ? "Pumas" : match.rival);
            const score = match.marcador || match.resultado || "";

            let homeScore = "";
            let awayScore = "";
            let isFuture = true;

            if (score !== "Próximo" && score.includes("-")) {
              const scores = score.split("-").map((s) => s.trim());
              homeScore = scores[0] || "";
              awayScore = scores[1] || "";
              isFuture = false;
            }

            const matchDate = match.fecha || "Fecha por definir";
            const matchTime = match.hora ? ` - ${match.hora}` : "";
            const statusText = isFuture ? "Por Jugar" : "Finalizado";

            return (
              <article
                key={index}
                className={`match-card ${isFuture ? "future" : "past"}`}
                role="group"
                aria-label="Partido"
                aria-describedby={`jornada-${index} fecha-${index} details-${index}`}
                tabIndex="0"
              >
                <header className="match-header">
                  <span className="jornada" id={`jornada-${index}`}>
                    {match.jornada}
                  </span>
                  <span
                    className={`status-badge ${isFuture ? "future-badge" : "past-badge"}`}
                  >
                    {statusText}
                  </span>
                </header>
                <div className="match-date" id={`fecha-${index}`}>
                  <time>
                    {matchDate}
                    {matchTime}
                  </time>
                </div>
                <div className="match-details" id={`details-${index}`}>
                  <div className="team">
                    <span className="team-name">{home}</span>
                    {!isFuture && <span className="score">{homeScore}</span>}
                  </div>
                  <div className="versus">vs</div>
                  <div className="team">
                    {!isFuture && <span className="score">{awayScore}</span>}
                    <span className="team-name">{away}</span>
                  </div>
                </div>
                {isFuture && index === firstFutureIndex && (
                  <div className="match-footer">
                    <span>Próximo Encuentro</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="data-source-notice">
          Información recuperada del{" "}
          <a
            href="https://www.ligamx.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            sitio oficial de la Liga MX
          </a>
          .
        </p>
      </section>
    </main>
  );
}
