import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "./style.css";

const getSiteUrl = () => {
  const configuredUrl = import.meta.env.VITE_SITE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  return window.location.origin;
};

const copyToClipboard = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};

export default function ShareButton({ title, text, path, imagePath }) {
  const { t } = useTranslation("common");
  const [status, setStatus] = useState("");

  const shareData = useMemo(() => {
    const siteUrl = getSiteUrl();

    return {
      title,
      text,
      url: `${siteUrl}${path}`,
      imageUrl: imagePath ? `${siteUrl}${imagePath}` : "",
    };
  }, [imagePath, path, text, title]);

  const handleShare = async () => {
    setStatus("");

    try {
      if (navigator.share) {
        if (shareData.imageUrl && navigator.canShare) {
          const response = await fetch(shareData.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], "guivilas-preview.png", {
            type: blob.type || "image/png",
          });
          const fileShareData = {
            files: [file],
            title: shareData.title,
            text: `${shareData.text}\n${shareData.url}`,
          };

          if (navigator.canShare(fileShareData)) {
            await navigator.share(fileShareData);
            setStatus(t("share.shared"));
            return;
          }
        }

        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        setStatus(t("share.shared"));
        return;
      }

      await copyToClipboard(shareData.url);
      setStatus(t("share.copied"));
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      await copyToClipboard(shareData.url);
      setStatus(t("share.copied"));
    }
  };

  return (
    <div className="share-button-wrapper">
      <button
        type="button"
        className="share-button"
        onClick={handleShare}
        aria-label={t("share.aria", { title })}
      >
        <svg
          aria-hidden="true"
          className="share-button-icon"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .22 1.12L8.91 8.77A3 3 0 1 0 9 15.16l6.18 3.58A3 3 0 1 0 16 17.26l-6.18-3.58a3.02 3.02 0 0 0-.01-2.34l6.3-3.65A2.98 2.98 0 0 0 18 8Z" />
        </svg>
        {t("share.button")}
      </button>
      {status && <span className="share-button-status">{status}</span>}
    </div>
  );
}

ShareButton.propTypes = {
  imagePath: PropTypes.string,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ShareButton.defaultProps = {
  imagePath: "",
};
