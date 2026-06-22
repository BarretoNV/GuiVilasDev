import { useState } from "react";
import PropTypes from "prop-types";
import {
  getCloudinaryVideoPosterSrcSet,
  getCloudinaryVideoPosterUrl,
} from "../../utils/cloudinary";
import "./style.css";

export default function AudiovisualCard({ video, onSelect, href }) {
  const [imageState, setImageState] = useState(
    video.publicId ? "loading" : "error",
  );
  const poster = getCloudinaryVideoPosterUrl(video);
  const posterSrcSet = getCloudinaryVideoPosterSrcSet(video);
  const accessibleLabel = href
    ? `Ver portfólio audiovisual: ${video.title}`
    : `Reproduzir ${video.title}`;

  const content = (
    <>
      <div className="audiovisual-card-media">
        {imageState !== "error" && poster ? (
          <img
            src={poster}
            srcSet={posterSrcSet}
            sizes="(max-width: 575px) 88vw, (max-width: 991px) 44vw, 25vw"
            alt={`Capa do vídeo ${video.title}`}
            loading="lazy"
            onLoad={() => setImageState("loaded")}
            onError={() => setImageState("error")}
          />
        ) : (
          <div
            className="audiovisual-card-fallback"
            role="img"
            aria-label="Capa indisponível"
          >
            <span>Capa indisponível</span>
            <small>O vídeo poderá ser aberto normalmente.</small>
          </div>
        )}
        {imageState === "loading" && (
          <span className="audiovisual-card-loading">Carregando capa…</span>
        )}
        <span className="audiovisual-card-play" aria-hidden="true">
          ▶
        </span>
      </div>
      <div className="audiovisual-card-content">
        <p>{video.category}</p>
        <h3>{video.title}</h3>
        <span>{video.description}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a className="audiovisual-card" href={href} aria-label={accessibleLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="audiovisual-card"
      onClick={() => onSelect(video)}
      aria-label={accessibleLabel}
    >
      {content}
    </button>
  );
}

AudiovisualCard.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publicId: PropTypes.string,
    posterTime: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
  href: PropTypes.string,
};
