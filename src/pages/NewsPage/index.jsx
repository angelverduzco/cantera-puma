import { useState } from "react";
import "./NewsPage.css";
import NewsCard from "../../components/NewsCard";
import { useNews } from "../../hooks/useNews";
import LoadingState from "../../components/LoadingState";
import useHead from "../../hooks/useHead";

export default function NewsSection() {
  useHead({
    title: "Últimas Noticias de Pumas UNAM",
    description:
      "Entérate de las últimas novedades del Club Universidad Nacional: transferencias, resultados y más.",
    path: "/noticias",
  });

  const { news, loading, error } = useNews();
  const [visibleCount, setVisibleCount] = useState(6);

  // Cargar 6 noticias adicionales al hacer click en "Más noticias"
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return <LoadingState message="Buscando últimas noticias de Pumas..." />;
  }

  if (error) {
    return (
      <main className="news-section">
        <section className="news-hero">
          <h2>Últimas Noticias</h2>
          <p>Entérate de las últimas novedades del Club Universidad Nacional</p>
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

  // Filtrar las noticias que se mostrarán de acuerdo a la paginación local
  const visibleNews = news.slice(0, visibleCount);
  const hasMore = news.length > visibleCount;

  return (
    <main className="news-section">
      <section className="news-hero">
        <h2>Últimas Noticias</h2>
        <p>
          Entérate de las últimas novedades del Club Universidad Nacional en
          tiempo real
        </p>
      </section>

      {news.length === 0 ? (
        <div className="news-no-data-container">
          <p>No hay noticias disponibles en este momento. ¡Vuelve más tarde!</p>
        </div>
      ) : (
        <>
          <div className="news-grid">
            {visibleNews.map((item, idx) => (
              <NewsCard news={item} key={item.guid || idx} />
            ))}
          </div>

          {/* Botón de carga de más noticias */}
          {hasMore && (
            <div className="news-pagination-container">
              <button
                onClick={handleLoadMore}
                className="news-load-more-btn"
                aria-label="Cargar más noticias"
              >
                <span>Más noticias</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="news-load-more-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
