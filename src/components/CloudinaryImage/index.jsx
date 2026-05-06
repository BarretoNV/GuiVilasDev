import PropTypes from "prop-types";
import { getCloudinarySrcSet, getCloudinaryUrl } from "../../utils/cloudinary";

export default function CloudinaryImage({
  image,
  alt,
  className = "",
  sizes = "100vw",
  width,
  height,
  loading = "lazy",
}) {
  const src = getCloudinaryUrl(image, { width });

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      srcSet={getCloudinarySrcSet(image)}
      sizes={sizes}
      alt={alt || image?.alt || ""}
      className={className}
      width={width}
      height={height}
      loading={loading}
    />
  );
}

CloudinaryImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      alt: PropTypes.string,
      cloudName: PropTypes.string,
      publicId: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.number,
    }),
  ]),
  alt: PropTypes.string,
  className: PropTypes.string,
  sizes: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.string,
};

