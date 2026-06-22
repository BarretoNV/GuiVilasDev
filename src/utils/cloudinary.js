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

const normalizeVideo = (video) => {
  if (!video) return null;
  return typeof video === "string" ? { publicId: video } : video;
};

export const getCloudinaryVideoUrl = (video, options = {}) => {
  const normalizedVideo = normalizeVideo(video);

  if (!normalizedVideo?.publicId) return "";

  const cloudName = normalizedVideo.cloudName || DEFAULT_CLOUD_NAME;
  const transformations = ["f_mp4", `q_${options.quality || "auto"}`, "vc_auto"];

  if (options.width) {
    transformations.push(`w_${options.width}`, "c_limit");
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations.join(
    ",",
  )}/${encodePublicId(normalizedVideo.publicId)}.mp4`;
};

export const getCloudinaryVideoPosterUrl = (video, options = {}) => {
  const normalizedVideo = normalizeVideo(video);

  if (!normalizedVideo?.publicId) return "";

  const cloudName = normalizedVideo.cloudName || DEFAULT_CLOUD_NAME;
  const width = options.width || 720;
  const height = options.height || 1280;
  const posterTime = options.posterTime ?? normalizedVideo.posterTime ?? 1;
  const transformations = [
    "f_auto",
    "q_auto",
    "c_fill",
    "g_auto",
    `w_${width}`,
    `h_${height}`,
    `so_${posterTime}`,
  ];

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations.join(
    ",",
  )}/${encodePublicId(normalizedVideo.publicId)}.jpg`;
};

export const getCloudinaryVideoPosterSrcSet = (
  video,
  widths = [320, 480, 720, 960],
) =>
  widths
    .map((width) => {
      const height = Math.round((width * 16) / 9);
      return `${getCloudinaryVideoPosterUrl(video, { width, height })} ${width}w`;
    })
    .join(", ");
