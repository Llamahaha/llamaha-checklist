import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const requestedPort = Number(process.env.PORT || process.argv[2] || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const fullPath = normalize(join(rootDir, relativePath));

  if (!fullPath.startsWith(rootDir)) {
    return null;
  }

  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    return fullPath;
  }

  if (existsSync(fullPath) && statSync(fullPath).isDirectory()) {
    const indexPath = join(fullPath, "index.html");
    if (existsSync(indexPath)) {
      return indexPath;
    }
  }

  return null;
}

const server = http.createServer((request, response) => {
  const filePath = resolvePath(request.url || "/");

  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const contentType = mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
  response.writeHead(200, {
    "content-type": contentType,
    "cache-control": "no-cache"
  });

  createReadStream(filePath).pipe(response);
});

server.listen(requestedPort, "127.0.0.1", () => {
  console.log(`Llamaha Help Center preview running at http://127.0.0.1:${requestedPort}`);
});
