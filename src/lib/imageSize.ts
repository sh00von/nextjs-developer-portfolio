import fs from "node:fs";
import path from "node:path";

export type ImageSize = { width: number; height: number };

const cache = new Map<string, ImageSize | null>();

/**
 * Read the intrinsic size of a PNG, JPEG, GIF or WebP file in /public from its header,
 * so Markdown images can be rendered with next/image without a dependency.
 */
export function getPublicImageSize(src: string): ImageSize | null {
  if (!src.startsWith("/")) return null;
  if (cache.has(src)) return cache.get(src) ?? null;

  let size: ImageSize | null = null;
  try {
    const file = path.join(process.cwd(), "public", decodeURIComponent(src.split("?")[0]));
    const buf = fs.readFileSync(file);
    size = readSize(buf);
  } catch {
    size = null;
  }
  cache.set(src, size);
  return size;
}

function readSize(buf: Buffer): ImageSize | null {
  // PNG: signature + IHDR
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // GIF
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: walk segments until a start-of-frame marker
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof) return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
      offset += 2 + length;
    }
  }
  return null;
}
