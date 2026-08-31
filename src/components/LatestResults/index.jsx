import { Link } from "react-router";
import "./LatestResults.css";
import { useCalendario } from "../../hooks/useCalendario";
import LoadingState from "../../components/LoadingState";

const LatestResults = () => {
  const { matches, loading, error } = useCalendario();

  // Filtramos solo los partidos finalizados (que no digan "Próximo")
  // y tomamos los últimos 3 (asumiendo que vienen en orden de jornada)
  const finishedMatches = matches.filter(
    (m) =>
      m.estado === "Finalizado" ||
      (m.marcador && m.marcador !== "Próximo") ||
      (m.resultado && m.resultado !== "Próximo"),
  );

  // Tomar los últimos 3 jugados (al reverso)
  const latestThree = finishedMatches.slice(-3).reverse();

  if (loading) {
    return (
      <section className="latest-results">
        <h2 id="results-title" className="results-title">
          Últimos Resultados
        </h2>
        <LoadingState message="Cargando resultados..." />
      </section>
    );
  }

  if (error || latestThree.length === 0) {
    return (
      <section className="latest-results">
        <h2 id="results-title" className="results-title">
          Últimos Resultados
        </h2>
        <div className="results-container" style={{ display: "block" }}>
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
    );
  }

  return (
    <section className="latest-results">
      <h2 id="results-title" className="results-title">
        Últimos Resultados
      </h2>
      <div className="results-container">
        {latestThree.map((match, index) => {
          // Normalizar datos entre JSON estático y web scraper
          const home =
            match.local ||
            (match.condicion === "Local" ? "Pumas" : match.rival);
          const away =
            match.visita ||
            (match.condicion === "Visitante" ? "Pumas" : match.rival);
          const score = match.marcador || match.resultado || "";

          // Dividir el marcador "1 - 1" -> homeScore: 1, awayScore: 1
          const scores = score.split("-").map((s) => s.trim());
          const homeScore = scores[0] || "";
          const awayScore = scores[1] || "";

          const matchDate = match.fecha || "Fecha por definir";

          return (
            <article
              key={index}
              className="match-card"
              aria-label={`Resultado: ${home} ${homeScore} - ${awayScore} ${away}`}
              tabIndex="0"
            >
              <div className="match-date">
                <time>{matchDate}</time>
              </div>
              <div className="match-details">
                <div className="team">
                  <span className="team-name">{home}</span>
                  <span className="score">{homeScore}</span>
                </div>
                <div className="versus">vs</div>
                <div className="team">
                  <span className="score">{awayScore}</span>
                  <span className="team-name">{away}</span>
                </div>
              </div>
              <div className="competition">
                <span>Liga MX - {match.jornada}</span>
              </div>
            </article>
          );
        })}
      </div>

      <Link
        to="/calendario"
        className="results-cta"
        aria-label="Ver calendario completo de Pumas"
      >
        Ver calendario completo
      </Link>
    </section>
  );
};

export default LatestResults;
