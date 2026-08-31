import headerImg from "../../assets/puma.webp";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <img
        src={headerImg}
        alt="Logo de Cantera Puma, portal de aficionados Pumas UNAM"
        width="130"
        height="130"
      />
      <h1>Cantera Puma</h1>
    </header>
  );
}
