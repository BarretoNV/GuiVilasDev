import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Container, Modal } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import AudiovisualCard from "../../components/AudiovisualCard";
import useLocale from "../../hooks/useLocale";
import { getAudiovisualPortfolio } from "../../data/audiovisualPortfolio";
import LoadingGIF from "../../assets/loadingGIF.gif";
import {
  getCloudinaryVideoPosterUrl,
  getCloudinaryVideoUrl,
} from "../../utils/cloudinary";
import "./style.css";

export default function AudiovisualPortfolio() {
  const locale = useLocale();
  const { t } = useTranslation("pages");
  const audiovisualPortfolio = getAudiovisualPortfolio(locale);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playbackError, setPlaybackError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef(null);

  const selectVideo = (video) => {
    setPlaybackError(false);
    setIsVideoLoading(true);
    setSelectedVideo(video);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }

    setSelectedVideo(null);
    setPlaybackError(false);
    setIsVideoLoading(false);
  };

  const handlePlaybackError = () => {
    setPlaybackError(true);
    setIsVideoLoading(false);
  };

  const handleVideoReady = () => {
    setIsVideoLoading(false);
  };

  const videoUrl = getCloudinaryVideoUrl(selectedVideo, { width: 1080 });
  const posterUrl = getCloudinaryVideoPosterUrl(selectedVideo);

  return (
    <>
      <NavBar />
      <main>
        <Container className="audiovisual-page text-light">
          <header className="audiovisual-page-header">
            <p>{t("audiovisual.kicker")}</p>
            <h1>{t("audiovisual.title")}</h1>
            <p>{t("audiovisual.description")}</p>
          </header>

          <section
            className="audiovisual-grid"
            aria-label={t("audiovisual.galleryAria")}
          >
            {audiovisualPortfolio.map((video) => (
              <AudiovisualCard
                key={video.key}
                video={video}
                onSelect={selectVideo}
              />
            ))}
          </section>
        </Container>
      </main>

      <Modal
        show={Boolean(selectedVideo)}
        onHide={closeModal}
        centered
        size="lg"
        contentClassName="audiovisual-modal"
        aria-labelledby="audiovisual-modal-title"
      >
        <Modal.Header closeButton closeVariant="white">
          <div>
            <p className="audiovisual-modal-category">
              {selectedVideo?.category}
            </p>
            <Modal.Title id="audiovisual-modal-title">
              {selectedVideo?.title}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {videoUrl && !playbackError ? (
            <div className="audiovisual-player-frame">
              {isVideoLoading && (
                <div
                  className="audiovisual-player-loading"
                  role="status"
                  aria-label={t("audiovisual.loadingVideo")}
                >
                  <img src={LoadingGIF} alt="" />
                  <span className="visually-hidden">
                    {t("audiovisual.loadingVideo")}
                  </span>
                </div>
              )}
              <video
                ref={videoRef}
                className="audiovisual-player"
                src={videoUrl}
                poster={posterUrl}
                controls
                playsInline
                preload="metadata"
                onLoadedMetadata={handleVideoReady}
                onLoadedData={handleVideoReady}
                onCanPlay={handleVideoReady}
                onPlaying={handleVideoReady}
                onError={handlePlaybackError}
              >
                {t("audiovisual.videoUnsupported")}
              </video>
            </div>
          ) : (
            <Alert variant="dark" className="audiovisual-video-error">
              {t("audiovisual.videoUnavailable")}
            </Alert>
          )}
          <p className="audiovisual-modal-description">
            {selectedVideo?.description}
          </p>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}
