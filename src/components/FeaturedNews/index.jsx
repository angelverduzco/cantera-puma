import { Link } from "react-router";
import { useNews } from "../../hooks/useNews";
import NewsCard from "../NewsCard";
import "./FeaturedNews.css";

export default function FeaturedNews() {
  const { news, loading, error } = useNews();

  const featured = news.slice(0, 3);

  return (
    <section
      className="featured-news"
      role="region"
      aria-label="Últimas noticias de Pumas"
    >
      <h2>Últimas Novedades</h2>
      <p className="featured-news-subtitle">
        Entérate de las últimas novedades del Club Universidad Nacional
      </p>

      {loading && <p className="featured-news-status">Cargando noticias...</p>}

      {error && (
        <p className="featured-news-status">
          No se pudieron cargar las noticias.
        </p>
      )}

      {!loading && !error && featured.length === 0 && (
        <p className="featured-news-status">
          No hay noticias disponibles en este momento.
        </p>
      )}

      {!loading && !error && featured.length > 0 && (
        <div className="featured-news-grid">
          {featured.map((item, idx) => (
            <NewsCard news={item} key={item.guid || idx} />
          ))}
        </div>
      )}

      <Link
        to="/noticias"
        className="cta-button"
        aria-label="Ver todas las noticias de Pumas"
      >
        Ver todas las noticias
      </Link>
    </section>
  );
}
