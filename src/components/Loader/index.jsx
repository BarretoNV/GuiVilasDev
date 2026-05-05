import LoadingGIF from "../../assets/loadingGIF.gif";
import "./style.css";

const Loader = () => {
  return (
    <div className="loader" role="status" aria-label="Carregando conteúdo">
      <img src={LoadingGIF} alt="" className="loader-image" />
    </div>
  );
};

export default Loader;
