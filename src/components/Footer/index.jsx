import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <p className="title">Pumas UNAM</p>
          <p>
            Club Universidad Nacional A.C. <br /> Representando a la UNAM desde
            1954
          </p>
        </div>

        <div>
          <p className="title">Enlaces</p>
          <a href="https://pumas.mx/" target="_blank" rel="noopener noreferrer">
            Sitio oficial
          </a>
          <a
            href="https://www.unam.mx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UNAM
          </a>
          <a
            href="https://tiendapumas.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tienda oficial
          </a>
        </div>

        <div>
          <p className="title">Contacto</p>
          <p>
            Estadio Olímpico Universitario <br /> Ciudad Universitaria, CDMX{" "}
            <br /> México
          </p>
        </div>
      </div>

      <p className="disclaimer">
        Los nombres, logotipos, imágenes y demás elementos identificadores del
        Club Universidad Nacional (Pumas UNAM) y la UNAM son propiedad de sus
        respectivos titulares. Este sitio es un proyecto sin fines de lucro y no
        está afiliado ni autorizado por el club. Se utiliza únicamente con fines
        informativos y educativos.
      </p>
    </footer>
  );
}
