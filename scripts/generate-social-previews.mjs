import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env") });

const distDir = path.join(rootDir, "dist");
const contentDir = path.join(rootDir, "src", "content");
const socialDir = path.join(distDir, "social");
const defaultOgPath = path.join(rootDir, "public", "social", "og-default.png");
const siteUrl = normalizeSiteUrl(
  process.env.VITE_SITE_URL || "https://guivilassite.vercel.app",
);
const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || "demo";

const cardWidth = 1200;
const cardHeight = 630;

const collections = [
  {
    collection: "blog",
    contentPath: path.join(contentDir, "blog"),
    routePrefix: "blog",
    socialPrefix: "blog",
    eyebrow: (post) => [formatDate(post.date), post.category]
      .filter(Boolean)
      .join(" / "),
    image: (post) => post.coverImage,
  },
  {
    collection: "astrofotografia",
    contentPath: path.join(contentDir, "astrofotografia"),
    routePrefix: "astrofotografia",
    socialPrefix: "astrofotografia",
    eyebrow: (post) => [post.target, post.constellation]
      .filter(Boolean)
      .join(" / "),
    image: (post) => {
      if (Array.isArray(post.images) && post.images.length > 0) {
        return post.images[0];
      }

      return post.image;
    },
  },
];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const escapeSvg = (value = "") =>
  escapeHtml(value).replaceAll("'", "&apos;");

function normalizeSiteUrl(value) {
  return value.replace(/\/+$/, "");
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

async function readMdxMetadata(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const match = source.match(/export const metadata\s*=\s*({[\s\S]*?});/);

  if (!match) {
    return null;
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

async function loadCollection({ collection, contentPath }) {
  const files = await fs.readdir(contentPath);
  const posts = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) {
      continue;
    }

    const filePath = path.join(contentPath, file);
    const metadata = await readMdxMetadata(filePath);

    if (!metadata || metadata.template || metadata.draft) {
      continue;
    }

    posts.push({
      ...metadata,
      collection,
      slug: metadata.slug || file.replace(/\.mdx$/, ""),
    });
  }

  return posts;
}

function getCloudinaryUrl(image, options = {}) {
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

  const transformations = [
    `f_${options.format || "auto"}`,
    `q_${options.quality || "auto"}`,
    `c_${options.crop || "fill"}`,
    `w_${options.width || cardWidth}`,
    `h_${options.height || cardHeight}`,
  ];

  return `https://res.cloudinary.com/${image.cloudName || cloudName}/image/upload/${transformations.join(
    ",",
  )}/${encodePublicId(image.publicId)}`;
}

function encodePublicId(publicId) {
  return publicId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

async function fetchImageBuffer(image) {
  const url = getCloudinaryUrl(image);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.warn(`Could not load social image ${url}: ${error.message}`);
    return null;
  }
}

async function createBackground(image) {
  const imageBuffer = await fetchImageBuffer(image);

  if (imageBuffer) {
    return sharp(imageBuffer)
      .resize(cardWidth, cardHeight, { fit: "cover" })
      .modulate({ brightness: 0.62, saturation: 0.82 })
      .blur(1)
      .png()
      .toBuffer();
  }

  try {
    return sharp(defaultOgPath)
      .resize(cardWidth, cardHeight, { fit: "cover" })
      .png()
      .toBuffer();
  } catch {
    return sharp({
      create: {
        width: cardWidth,
        height: cardHeight,
        channels: 4,
        background: "#081216",
      },
    })
      .png()
      .toBuffer();
  }
}

function wrapText(text, maxChars, maxLines) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length > maxChars && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?]*$/, "")}...`;
  }

  return lines;
}

function textLinesSvg(lines, x, y, size, color, weight = 400, lineHeight = 1.18) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * size * lineHeight}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeSvg(
          line,
        )}</text>`,
    )
    .join("");
}

function createOverlaySvg(post, config) {
  const titleLines = wrapText(post.title, 24, 2);
  const excerptLines = wrapText(post.excerpt, 56, 2);
  const eyebrow = config.eyebrow(post);

  return Buffer.from(`
    <svg width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#05080d" stop-opacity="0.94"/>
          <stop offset="0.58" stop-color="#071319" stop-opacity="0.82"/>
          <stop offset="1" stop-color="#0e5c62" stop-opacity="0.48"/>
        </linearGradient>
      </defs>
      <rect width="${cardWidth}" height="${cardHeight}" fill="url(#shade)"/>
      <rect x="76" y="74" width="76" height="76" rx="0" fill="none" stroke="#f8fafc" stroke-width="3"/>
      <path d="M92 91 L92 137 L141 114 Z" fill="none" stroke="#f8fafc" stroke-width="3" stroke-linejoin="round"/>
      <text x="104" y="123" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#f8fafc">GV</text>
      <text x="76" y="204" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="1.5" fill="#4bd4b5">${escapeSvg(
        eyebrow || "GuiVilas Dev",
      )}</text>
      <g font-family="Arial, Helvetica, sans-serif">
        ${textLinesSvg(titleLines, 76, 292, 72, "#f8fafc", 800, 1.08)}
        ${textLinesSvg(excerptLines, 76, 438, 32, "#d5e5e8", 400, 1.28)}
        <rect x="76" y="538" width="224" height="5" rx="2.5" fill="#4bd4b5"/>
        <text x="76" y="586" font-size="26" font-weight="700" fill="#f8fafc">${escapeSvg(
          siteUrl.replace(/^https?:\/\//, ""),
        )}</text>
      </g>
    </svg>
  `);
}

async function createSocialCard(post, config) {
  const background = await createBackground(config.image(post));
  const overlay = createOverlaySvg(post, config);
  const outputPath = path.join(
    socialDir,
    config.socialPrefix,
    `${post.slug}.png`,
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await sharp(background)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toFile(outputPath);

  return `social/${config.socialPrefix}/${post.slug}.png`;
}

async function writeRouteHtml(post, config, socialPath, baseHtml) {
  const routePath = `${config.routePrefix}/${post.slug}`;
  const routeUrl = `${siteUrl}/${routePath}`;
  const imageUrl = `${siteUrl}/${socialPath}`;
  const title = `${post.title} | GuiVilas Dev`;
  const description = post.excerpt || "Projetos, blog e astrofotografia por Guilherme Barreto.";
  const html = updateHtmlMetadata(baseHtml, {
    title,
    description,
    url: routeUrl,
    image: imageUrl,
  });
  const outputPath = path.join(distDir, routePath, "index.html");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html);
}

function updateHtmlMetadata(html, metadata) {
  let updated = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(metadata.title)}</title>`,
  );

  const replacements = [
    ["name", "description", metadata.description],
    ["property", "og:title", metadata.title],
    ["property", "og:description", metadata.description],
    ["property", "og:image", metadata.image],
    ["property", "og:url", metadata.url],
    ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description],
    ["name", "twitter:image", metadata.image],
  ];

  for (const [attribute, key, value] of replacements) {
    updated = replaceMetaContent(updated, attribute, key, value);
  }

  return updated;
}

function replaceMetaContent(html, attribute, key, value) {
  const escapedValue = escapeHtml(value);
  const pattern = new RegExp(
    `<meta(?=[^>]*\\s${attribute}="${escapeRegExp(
      key,
    )}")(?=[^>]*\\scontent=")[^>]*>`,
    "m",
  );

  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapedValue}" />`,
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  let generatedCount = 0;

  for (const config of collections) {
    const posts = await loadCollection(config);

    for (const post of posts) {
      const socialPath = await createSocialCard(post, config);
      await writeRouteHtml(post, config, socialPath, baseHtml);
      generatedCount += 1;
    }
  }

  console.log(`Generated ${generatedCount} specific social previews.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
