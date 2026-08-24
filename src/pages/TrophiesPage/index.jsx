import "./TrophiesPage.css";
import useHead from "../../hooks/useHead";
import ligamxTrophy from "../../assets/trofeos/ligamx.webp";
import campeonDeCampeonesTrophy from "../../assets/trofeos/campeon_de_campeones.webp";
import concacafTrophy from "../../assets/trofeos/concachampions.webp";
import TrophyCard from "../../components/TrophyCard";
import copaMexicoTrophy from "../../assets/trofeos/copa_mexico.webp";
import segundaDivisionTrophy from "../../assets/trofeos/segunda_division.webp";
import interamericanaTrophy from "../../assets/trofeos/copa_interamericana.webp";
import santiagoBernabeuTrophy from "../../assets/trofeos/copa_santiago_bernabeu.webp";

const trophies = [
  {
    id: 1,
    name: "Liga MX",
    count: 7,
    years: [
      "1976-77",
      "1980-81",
      "1990-91",
      "2004(C)",
      "2004(A)",
      "2009(C)",
      "2011(C)",
    ],
    image: ligamxTrophy,
  },
  {
    id: 2,
    name: "Copa de Campeones de la Concacaf",
    count: 3,
    years: ["1981", "1982", "1989"],
    image: concacafTrophy,
  },
  {
    id: 3,
    name: "Copa México",
    count: 1,
    years: ["1974-1975"],
    image: copaMexicoTrophy,
  },
  {
    id: 4,
    name: "Copa Interamericana",
    count: 1,
    years: ["1981"],
    image: interamericanaTrophy,
  },
  {
    id: 5,
    name: "Campeón de Campeones",
    count: 2,
    years: ["1974-1975", "2003-2004"],
    image: campeonDeCampeonesTrophy,
  },
  {
    id: 6,
    name: "Trofeo Santiago Bernabéu",
    count: 1,
    years: ["1975"],
    image: santiagoBernabeuTrophy,
  },
  {
    id: 7,
    name: "Segunda División",
    count: 1,
    years: ["1961-1962"],
    image: segundaDivisionTrophy,
  },
];

export default function TrophiesPage() {
  useHead({
    title: "Trofeos de Pumas UNAM — Palmarés Completo",
    description:
      "Explora el palmarés completo de Pumas UNAM: ligas, copas y campeonatos ganados a lo largo de su historia.",
    path: "/trofeos",
  });

  return (
    <main className="trophies-container">
      <section className="hero-section">
        <h2>Palmarés de Pumas UNAM</h2>
        <p>Una historia de gloria y pasión universitaria</p>
      </section>

      <div className="trophies-grid">
        {trophies.map((trophy, index) => (
          <TrophyCard trophy={trophy} key={index} />
        ))}
      </div>
    </main>
  );
}
