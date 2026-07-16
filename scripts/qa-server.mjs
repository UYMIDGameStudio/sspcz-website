/**
 * QA static server: serves ./dist under the deployment base path so
 * Lighthouse audits the site exactly as a base-path host would serve it.
 */
import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path';

const BASE = '';
const ROOT = resolve('./dist');
const HOST = '127.0.0.1';
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

function isInsideRoot(file) {
  const rel = relative(ROOT, file);
  return rel === '' || (!isAbsolute(rel) && rel !== '..' && !rel.startsWith(`..${sep}`));
}

async function readInsideRoot(file) {
  if (!isInsideRoot(file)) throw new Error('outside root');
  const canonical = await realpath(file);
  if (!isInsideRoot(canonical)) throw new Error('outside root');
  return { data: await readFile(canonical), file: canonical };
}

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
    let file = resolve(ROOT, rel.replace(/^[/\\]+/, ''));
    let result;
    try {
      result = await readInsideRoot(file);
    } catch {
      file = join(file, 'index.html');
      result = await readInsideRoot(file);
    }
    res.writeHead(200, {
      'content-type': TYPES[extname(result.file)] ?? 'application/octet-stream',
    });
    res.end(result.data);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}).listen(PORT, HOST, () => {
  console.log(`qa server ready on http://${HOST}:${PORT}${BASE}/`);
});
