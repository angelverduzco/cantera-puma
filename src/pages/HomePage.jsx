import Introduction from "../components/Introduction";
import Estadio from "../components/Estadio";
import Campeonatos from "../components/Campeonatos";
import Form from "../components/Form";
import LatestResults from "../components/LatestResults";
import useHead from "../hooks/useHead";

export default function HomePage() {
  useHead({
    title: "Portal de Aficionados Pumas UNAM",
    description:
      "Únete a la pasión auriazul. Descubre la historia, campeonatos y la cantera inigualable de Pumas UNAM.",
    path: "/",
  });

  return (
    <main>
      <Introduction />
      <Campeonatos />
      <Estadio />
      <LatestResults />
      <Form />
    </main>
  );
}
