import { lazy, Suspense } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoadingState from "./components/LoadingState";
import { useModal } from "./ModalContext";
import { Routes, Route } from "react-router";

const HomePage = lazy(() => import("./pages/HomePage"));
const TrophiesPage = lazy(() => import("./pages/TrophiesPage"));
const PlayersPage = lazy(() => import("./pages/PlayersPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const StandingsPage = lazy(() => import("./pages/StandingsPage"));
const CalendarioPage = lazy(() => import("./pages/CalendarioPage"));

function App() {
  const { isOpen, message, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {message}
      </Modal>
      <Header />
      <NavBar />
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/trofeos" element={<TrophiesPage />} />
          <Route path="/plantilla" element={<PlayersPage />} />
          <Route path="/posiciones" element={<StandingsPage />} />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/noticias" element={<NewsPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
