import { useState } from "react";
import "./TrophyCard.css";

export default function TrophyCard({ trophy }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    setIsOpen(e.target.open);
  };

  return (
    <article
      className="trophy-card"
      aria-labelledby={`trophy-name-${trophy.id}`}
    >
      <div className="trophy-card-inner">
        <div className="trophy-img-container">
          <img
            src={trophy.image}
            alt={`Trofeo de ${trophy.name}`}
            className="trophy-img"
            loading="lazy"
          />
        </div>
        <div className="trophy-content">
          <h3 id={`trophy-name-${trophy.id}`}>{trophy.name}</h3>
          <p className="trophy-count" id={`trophy-count-${trophy.id}`}>
            <strong>{trophy.count}</strong> Títulos
          </p>

          <details onToggle={handleToggle} className="trophy-details">
            <summary
              id={`summary-years-${trophy.id}`}
              aria-expanded={isOpen}
              aria-controls={`years-${trophy.id}`}
              aria-labelledby={`trophy-name-${trophy.id} trophy-count-${trophy.id} summary-years-${trophy.id}`}
            >
              Ver años de campeonato
            </summary>
            <ul
              id={`years-${trophy.id}`}
              className="years-list"
              aria-live="polite"
            >
              {isOpen && (
                <>
                  <span className="sr-only">Años de campeonato:</span>
                  {trophy.years.map((year, i) => (
                    <li key={i}>{year}</li>
                  ))}
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </article>
  );
}
