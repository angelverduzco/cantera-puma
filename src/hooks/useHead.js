import { useEffect } from "react";

const SITE_URL = "https://canterapuma.vercel.app";
const SITE_NAME = "Cantera Puma";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(property, content) {
  let el =
    document.querySelector(`meta[property="${property}"]`) ||
    document.querySelector(`meta[name="${property}"]`);

  if (!el) {
    el = document.createElement("meta");
    if (property.startsWith("og:")) {
      el.setAttribute("property", property);
    } else {
      el.setAttribute("name", property);
    }
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", `${SITE_URL}${path}`);
}

export default function useHead({ title, description, path, image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = `${SITE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    document.title = fullTitle;

    setMeta("description", description);

    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:url", url);
    setMeta("og:type", "website");
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:locale", "es_MX");
    setMeta("og:image", img);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", img);

    setCanonical(path);
  }, [title, description, path, image]);
}
