const DEFAULT_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "demo";
const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920];

const encodePublicId = (publicId) =>
  publicId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

export const getCloudinaryUrl = (image, options = {}) => {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  if (image.url) {
    return image.url;
  }

  if (!image.publicId) {
    return "";
  }

  const cloudName = image.cloudName || DEFAULT_CLOUD_NAME;
  const width = options.width || image.width;
  const quality = options.quality || "auto";
  const format = options.format || "auto";
  const crop = options.crop || "limit";
  const transformations = [`f_${format}`, `q_${quality}`, `c_${crop}`];

  if (width) {
    transformations.push(`w_${width}`);
  }

  if (options.height) {
    transformations.push(`h_${options.height}`);
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(
    ",",
  )}/${encodePublicId(image.publicId)}`;
};

export const getCloudinarySrcSet = (image, widths = DEFAULT_WIDTHS) =>
  widths
    .map((width) => `${getCloudinaryUrl(image, { width })} ${width}w`)
    .join(", ");

