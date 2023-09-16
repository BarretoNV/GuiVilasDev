import LoadingGIF from "../../assets/loadingGIF.gif";
import "./style.css"

const Loader = () => {
  return (
    <div>
      <div className="loader">
        <img src={LoadingGIF} alt="Loader" className="loader-image" />
      </div>
    </div>
  );
};

export default Loader;
