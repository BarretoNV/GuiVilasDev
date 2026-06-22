import { useRef, useState } from "react";
import { Alert, Container, Modal } from "react-bootstrap";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import AudiovisualCard from "../../components/AudiovisualCard";
import audiovisualPortfolio from "../../data/audiovisualPortfolio";
import LoadingGIF from "../../assets/loadingGIF.gif";
import {
  getCloudinaryVideoPosterUrl,
  getCloudinaryVideoUrl,
} from "../../utils/cloudinary";
import "./style.css";

export default function AudiovisualPortfolio() {
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
            <p>Social media e edição</p>
            <h1>Portfólio Audiovisual</h1>
            <p>
              Texto placeholder para apresentar minha experiência com edição de
              vídeos, criação de conteúdo e desenvolvimento de peças para redes
              sociais.
            </p>
          </header>

          <section
            className="audiovisual-grid"
            aria-label="Galeria de trabalhos audiovisuais"
          >
            {audiovisualPortfolio.map((video) => (
              <AudiovisualCard
                key={video.title}
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
                  aria-label="Carregando vídeo"
                >
                  <img src={LoadingGIF} alt="" />
                  <span className="visually-hidden">Carregando vídeo</span>
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
                Seu navegador não oferece suporte à reprodução deste vídeo.
              </video>
            </div>
          ) : (
            <Alert variant="dark" className="audiovisual-video-error">
              Este vídeo ainda não está disponível. Confira o publicId do
              Cloudinary em <code>src/data/audiovisualPortfolio.js</code>.
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
