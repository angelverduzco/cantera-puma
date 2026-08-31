import { Link } from "react-router";
import ligamxTrophy from "../../assets/trofeos/ligamx.webp";
import concacafTrophy from "../../assets/trofeos/concachampions.webp";
import "./Campeonatos.css";

const highlights = [
  {
    id: 1,
    name: "Liga MX",
    count: 7,
    image: ligamxTrophy,
    years: [
      "1976-77",
      "1980-81",
      "1990-91",
      "Clausura 2004",
      "Apertura 2004",
      "Clausura 2009",
      "Clausura 2011",
    ],
  },
  {
    id: 2,
    name: "Copa de Campeones de la Concacaf",
    count: 3,
    image: concacafTrophy,
    years: ["1981", "1982", "1989"],
  },
];

export default function Campeonatos() {
  return (
    <section className="campeonatos">
      <h2>Palmarés de Pumas UNAM</h2>

      <ol className="timeline" role="list">
        {highlights.map((trophy) => (
          <li key={trophy.id} className="timeline-item" role="listitem">
            <div className="timeline-node" aria-hidden="true" />
            <div className="timeline-card">
              <div className="timeline-card-header">
                <img
                  src={trophy.image}
                  alt={`Trofeo de ${trophy.name}`}
                  className="timeline-trophy-img"
                  loading="lazy"
                />
                <div className="timeline-card-info">
                  <h3>{trophy.name}</h3>
                  <span className="trophy-badge">
                    <strong>{trophy.count}</strong> títulos
                  </span>
                </div>
              </div>
              <div className="timeline-years">
                {trophy.years.map((year, i) => (
                  <span key={i} className="year-pill">
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Link
        to="/trofeos"
        className="cta-button"
        aria-label="Ver palmarés completo de trofeos de Pumas"
      >
        Ver todos los trofeos
      </Link>
    </section>
  );
}
