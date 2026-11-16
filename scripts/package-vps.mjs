import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';

// Audit again when invoked directly, so a stale subpath build cannot be packaged.
await import('./verify-build.mjs');
const output = resolve('artifacts/robertwalhout-vps.tar.gz');
const staging = await mkdtemp(join(tmpdir(), 'robertwalhout-vps-'));
try {
  await cp('dist/resume/browser', join(staging, 'site'), { recursive: true });
  // Nginx uses its own configuration; Apache directives are not public assets.
  await rm(join(staging, 'site', '.htaccess'), { force: true });
  await cp('deploy/nginx', join(staging, 'nginx'), { recursive: true });
  await cp('deploy/install-site.sh', join(staging, 'install-site.sh'));
  await cp('deploy/reload-nginx.sh', join(staging, 'reload-nginx.sh'));
  await cp('DEPLOYMENT.md', join(staging, 'DEPLOYMENT.md'));
  await mkdir(resolve('artifacts'), { recursive: true });
  await promisify(execFile)('tar', ['-czf', output, '-C', staging, 'site', 'nginx', 'install-site.sh', 'reload-nginx.sh', 'DEPLOYMENT.md']);
  const digest = createHash('sha256').update(await readFile(output)).digest('hex');
  await writeFile(output + '.sha256', `${digest}  robertwalhout-vps.tar.gz\n`);
  console.log(`VPS package: ${output}`);
  console.log(`SHA-256 checksum: ${output}.sha256`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
