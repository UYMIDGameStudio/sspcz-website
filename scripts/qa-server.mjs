/**
 * QA static server: serves ./dist under the deployment base path so
 * Lighthouse audits the site exactly as a base-path host would serve it.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const BASE = '';
const ROOT = './dist';
const PORT = 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === BASE) pathname = `${BASE}/`;
    if (!pathname.startsWith(`${BASE}/`)) {
      res.writeHead(404);
      res.end('outside base path');
      return;
    }
    let rel = pathname.slice(BASE.length);
    if (rel.endsWith('/')) rel += 'index.html';
    let file = normalize(join(ROOT, rel));
    let data;
    try {
      data = await readFile(file);
    } catch {
      file = join(file, 'index.html');
      data = await readFile(file);
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}).listen(PORT, () => {
  console.log(`qa server ready on http://localhost:${PORT}${BASE}/`);
});
