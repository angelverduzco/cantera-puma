import "./StandingsPage.css";
import { usePosiciones } from "../../hooks/usePosiciones";
import StandingsTable from "../../components/StandingsTable";
import LoadingState from "../../components/LoadingState";
import useHead from "../../hooks/useHead";

export default function StandingsPage() {
  useHead({
    title: "Tabla de Posiciones Liga MX — Pumas UNAM",
    description:
      "Consulta la tabla de posiciones actualizada del torneo Liga MX. Puntos, goles y clasificación de todos los equipos.",
    path: "/posiciones",
  });

  const { data, loading, error } = usePosiciones();

  if (loading) {
    return (
      <main className="standings-container">
        <LoadingState message="Cargando tabla de posiciones..." />
      </main>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <main className="standings-container">
        <section className="standings-hero">
          <h2>Tabla de Posiciones</h2>
          <p>Liga MX — Clausura 2026</p>
        </section>
        <section
          aria-labelledby="standings-heading"
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

  // El nuevo hook devuelve el arreglo de posiciones directamente en data
  const tableData = data;
  const leagueName = tableData[0]?.strLeague || "Liga MX";
  const season = tableData[0]?.strSeason || "Clausura 2026";

  return (
    <main className="standings-container">
      <section className="standings-hero">
        <h2>Tabla de Posiciones</h2>
        <p>
          {leagueName} {season && `— Temporada ${season}`}
        </p>
      </section>

      <section
        className="standings-content"
        aria-labelledby="standings-heading"
      >
        <h3 id="standings-heading" className="sr-only">
          Clasificación de equipos
        </h3>
        <StandingsTable standings={tableData} />
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
