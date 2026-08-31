import estadioImg from "../../assets/estadio.webp";
import "./Estadio.css";

export default function Estadio() {
  return (
    <section className="estadio-section">
      <div className="estadio-content">
        <h2>Estadio Olímpico Universitario</h2>
        <p className="estadio-description">
          Sede histórica de los Juegos Olímpicos de 1968 y fortaleza implacable
          donde los universitarios despliegan su pasión auriazul cada domingo.
        </p>
        <ul className="estadio-stats">
          <li>
            <strong>72,000</strong>
            <span>Espectadores</span>
          </li>
          <li>
            <strong>1952</strong>
            <span>Inauguración</span>
          </li>
          <li>
            <strong>Patrimonio</strong>
            <span>Cultural (UNESCO)</span>
          </li>
        </ul>
      </div>
      <div className="estadio-image-container">
        <img
          src={estadioImg}
          alt="Fotografía del imponente Estadio Olímpico Universitario visto desde la cancha"
          loading="lazy"
          width="800"
          height="600"
        />
      </div>
    </section>
  );
}
