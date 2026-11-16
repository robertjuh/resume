import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const port = Number(process.env.PORT || 4173);
const root = resolve('dist/resume/browser');
const types = { '.pdf': 'application/pdf', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/') { res.writeHead(302, { Location: '/resume/' }); res.end(); return; }
    if (!pathname.startsWith('/resume/')) { res.writeHead(404); res.end(); return; }
    const file = resolve(root, pathname.slice('/resume/'.length) || 'index.html');
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); res.end(); return; }
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '0.0.0.0', () => console.log('Static production preview: http://localhost:' + port + '/resume/'));

