import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  getCloudinaryVideoPosterSrcSet,
  getCloudinaryVideoPosterUrl,
} from "../../utils/cloudinary";
import "./style.css";

export default function AudiovisualCard({ video, onSelect, href }) {
  const { t } = useTranslation("common");
  const [imageState, setImageState] = useState(
    video.publicId ? "loading" : "error",
  );
  const poster = getCloudinaryVideoPosterUrl(video);
  const posterSrcSet = getCloudinaryVideoPosterSrcSet(video);
  const accessibleLabel = href
    ? `${t("nav.links.audiovisual")}: ${video.title}`
    : `Play ${video.title}`;

  const content = (
    <>
      <div className="audiovisual-card-media">
        {imageState !== "error" && poster ? (
          <img
            src={poster}
            srcSet={posterSrcSet}
            sizes="(max-width: 575px) 88vw, (max-width: 991px) 44vw, 25vw"
            alt={`${video.title} cover`}
            loading="lazy"
            onLoad={() => setImageState("loaded")}
            onError={() => setImageState("error")}
          />
        ) : (
          <div
            className="audiovisual-card-fallback"
            role="img"
            aria-label={t("loading.coverUnavailable")}
          >
            <span>{t("loading.coverUnavailable")}</span>
            <small>{t("loading.videoCanOpen")}</small>
          </div>
        )}
        {imageState === "loading" && (
          <span className="audiovisual-card-loading">{t("loading.cover")}</span>
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
