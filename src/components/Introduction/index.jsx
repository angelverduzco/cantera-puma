import { Link } from "react-router";
import heroImg from "../../assets/campeon.webp";
import "./Introduction.css";

export default function Introduction() {
  return (
    <section className="introduction">
      <img
        src={heroImg}
        alt=""
        className="hero-bg"
        fetchPriority="high"
        width="1920"
        height="1080"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h2>
          La Máxima Casa
          <br />
          De Estudios
        </h2>
        <p>
          Los Pumas de la UNAM son uno de los equipos más emblemáticos del
          fútbol mexicano, representando con orgullo a la Universidad Nacional
          Autónoma de México desde 1954.
        </p>
        <p className="hero-subtitle">
          Con 7 campeonatos de liga y una rica tradición de formar talento desde
          sus fuerzas básicas, los Pumas son sinónimo de garra, corazón y pasión
          universitaria.
        </p>
        <Link
          to="/plantilla"
          className="cta-button"
          aria-label="Conoce a la plantilla oficial de Pumas"
        >
          Conoce al Equipo
        </Link>
      </div>
    </section>
  );
}
