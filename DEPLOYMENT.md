# Host robertwalhout.nl on the Webtropia VPS

Public URL: **https://robertwalhout.nl/**. Both HTTP and `www` redirect to this URL after HTTPS setup. Section links such as `/#projects` keep working after a refresh.

The portfolio is a static Angular application. Build it locally and upload the prepared package. The Debian VPS only needs Nginx and Certbot; no Node.js process or database is needed there.

These instructions prepare a fresh Debian VPS using the Nginx web server already responding at **89.163.154.215**. The project files have been prepared locally; they have not been installed on the VPS.

## 1. TransIP DNS and Webtropia firewall

Your supplied settings are already correct for website hosting. Public DNS was also checked on 16 November 2026:

| Name | Type | Value | TTL |
| --- | --- | --- | --- |
| `@` | A | `89.163.154.215` | 1 hour |
| `www` | CNAME | `robertwalhout.nl.` | 1 hour is fine |

The trailing dot on the CNAME target is intentional. Keep the existing TransIP nameservers. There is currently no apex AAAA record; add one only if you also configure and verify the VPS's IPv6 address. DNS caches can take time to reflect later changes.

The MX, SPF/TXT, DKIM and DMARC records are email settings. Leave them as they are for this website deployment. The contact link still opens `robertwalhout@gmail.com`.

In Webtropia's **Firewall**, allow inbound **TCP 80** and **TCP 443**, if a firewall policy is enabled. Allow these ports in any active Debian firewall as well. Keep the existing SSH access rule. HTTP port 80 must remain reachable for certificate renewal.

At the time of the check, HTTP showed the Nginx welcome page and HTTPS did not accept a connection. The steps below replace that welcome page and enable HTTPS.

## 2. Build the package on your computer

Use Node.js **24.15+ within version 24** and npm. From this repository:

```sh
nvm use
npm ci
npm run typecheck
npm run package:vps
```

`package:vps` builds for `/`, checks the canonical domain and public assets, audits for private content/CV files, and creates:

```text
artifacts/robertwalhout-vps.tar.gz
artifacts/robertwalhout-vps.tar.gz.sha256
```

The packaging command uses `tar` (available on Linux, macOS and current Windows). The prepared archive contains:

```text
site/                       Compiled public files; index.html is here
nginx/                      HTTP, HTTPS and shared static configuration
install-site.sh             Installs a release and switches the current symlink
reload-nginx.sh              Certificate renewal hook
DEPLOYMENT.md                These instructions
```

Only `site/` becomes public. Source code, original photos, private CV backups, credentials and review documents are excluded. The old `resume-webreus.zip` is for the former host and must not be used here.

Optional browser checks before upload: `npm test` (requires the Playwright Chromium installation). Local preview: `npm run preview`, then open http://localhost:4173/.

## 3. Upload and connect

From your computer, upload the archive and checksum:

```sh
scp artifacts/robertwalhout-vps.tar.gz artifacts/robertwalhout-vps.tar.gz.sha256 root@89.163.154.215:/root/
ssh root@89.163.154.215
```

Use the SSH account/password or SSH key configured for the VPS. If you use another administrator account, upload to that account's home directory and run the following server commands with `sudo` or from a root shell. The commands below assume a root SSH session.

Install the Debian packages, extract the archive into a fresh directory, and install the site:

```sh
apt-get update
apt-get install -y nginx certbot ca-certificates curl
systemctl enable --now nginx

cd /root
sha256sum -c robertwalhout-vps.tar.gz.sha256
```

Continue only if the checksum says `OK`:

```sh
deploy_dir=$(mktemp -d /root/robertwalhout-deploy-XXXXXXXX)
tar -xzf robertwalhout-vps.tar.gz -C "$deploy_dir"
cd "$deploy_dir"
sh ./install-site.sh
```

Keep this shell open in the extracted directory for the next steps. The installer copies the public files into a new `/var/www/robertwalhout.nl/releases/` directory, sets readable file permissions and atomically switches `/var/www/robertwalhout.nl/current` to it. Previous releases are kept for rollback.

## 4. Enable the HTTP website

Back up Nginx's configuration and install the supplied files:

```sh
tar -czf "/root/nginx-before-robertwalhout-$(date +%Y%m%d-%H%M%S).tar.gz" -C /etc nginx
install -d -m 755 /etc/nginx/snippets /var/lib/letsencrypt/.well-known/acme-challenge
install -m 644 nginx/robertwalhout-static.conf /etc/nginx/snippets/robertwalhout-static.conf
install -m 644 nginx/robertwalhout-http.conf /etc/nginx/sites-available/robertwalhout.nl
ln -s /etc/nginx/sites-available/robertwalhout.nl /etc/nginx/sites-enabled/robertwalhout.nl
nginx -t && systemctl reload nginx
```

This adds a named site alongside Debian's default configuration. Confirm that both domains now serve the portfolio:

```sh
curl -I http://robertwalhout.nl/
curl -I http://www.robertwalhout.nl/
```

Both should return `200 OK`. If the welcome page remains, inspect `nginx -T` for another `server_name` using this domain and resolve that duplicate before proceeding.

## 5. Issue the HTTPS certificate

Request a Let's Encrypt certificate for both names. Certbot will ask for your email address and agreement to its terms:

```sh
certbot certonly --webroot -w /var/lib/letsencrypt --cert-name robertwalhout.nl -d robertwalhout.nl -d www.robertwalhout.nl
```

Continue only after Certbot confirms successful issuance. Install the final HTTPS configuration:

```sh
cp /etc/nginx/sites-available/robertwalhout.nl /etc/nginx/sites-available/robertwalhout.nl.http-backup
install -m 644 nginx/robertwalhout-https.conf /etc/nginx/sites-available/robertwalhout.nl
nginx -t && systemctl reload nginx
```

This enables TLS for both domains and redirects HTTP and `www` to `https://robertwalhout.nl`, preserving the path and query string. HTTPS uses the certificate files in `/etc/letsencrypt/live/robertwalhout.nl/`.

If the HTTPS configuration fails validation, restore the HTTP configuration while investigating:

```sh
cp /etc/nginx/sites-available/robertwalhout.nl.http-backup /etc/nginx/sites-available/robertwalhout.nl
nginx -t && systemctl reload nginx
```

## 6. Enable renewal and check the result

Install the reload hook so Nginx picks up renewed certificates, enable Debian's renewal timer, and test renewal:

```sh
install -d -m 755 /etc/letsencrypt/renewal-hooks/deploy
install -m 755 reload-nginx.sh /etc/letsencrypt/renewal-hooks/deploy/robertwalhout-nginx
systemctl enable --now certbot.timer
certbot renew --dry-run
systemctl list-timers certbot.timer
```

Keep Nginx running and port 80 open for the webroot challenge. Do not delete `/var/lib/letsencrypt`.

```sh
curl -I https://robertwalhout.nl/
curl -I http://robertwalhout.nl/
curl -I https://www.robertwalhout.nl/
curl -I https://robertwalhout.nl/cv/robert-walhout-nl.pdf
curl -I https://robertwalhout.nl/resume/cv/robert-walhout-en.pdf
```

Expected: HTTPS apex returns `200` with UTF-8 HTML; HTTP and HTTPS `www` return `301` to the HTTPS apex; both former CV URLs return `404`.

Open https://robertwalhout.nl/ and check photos, both languages, section navigation, project dialogs and a refresh at `/#projects`. Missing asset paths should return `404`, rather than the application's HTML.

## Later updates and rollback

Rebuild with `npm run package:vps`, upload the new archive/checksum, and repeat the extraction and `sh ./install-site.sh` commands from step 3. Skip package installation and the first-time Nginx/certificate steps. A site-only update does not require an Nginx reload. Install a changed Nginx configuration separately and validate it with `nginx -t` before reloading.

The installer prints the previous release path. To roll back, substitute that exact existing path below:

```sh
previous_release=/var/www/robertwalhout.nl/releases/REPLACE_WITH_PREVIOUS_RELEASE
test -f "$previous_release/index.html" && ln -s "$previous_release" /var/www/robertwalhout.nl/rollback && mv -Tf /var/www/robertwalhout.nl/rollback /var/www/robertwalhout.nl/current
```

The former `freerunnl.nl/resume/` site is hosted separately. Redirecting that old address would require a change at its original host.

## Troubleshooting and references

- **Certificate validation fails:** Check both DNS names, Webtropia's firewall, any Debian firewall and HTTP access to `/.well-known/acme-challenge/`. Do not install the HTTPS configuration until issuance succeeds.
- **Blank or unstyled page:** Use the new root build, confirm `<base href="/">`, and install all files from the same package. The Angular output directory name does not belong in the public URL.
- **403:** Check permissions on `/var/www/robertwalhout.nl`, the release directory and its files. The supplied installer sets these for Nginx.
- **Nginx configuration errors:** Run `nginx -t`; inspect `journalctl -u nginx -n 50 --no-pager`.
- **Retired CV files:** Neither the package nor web root should contain PDFs. Nginx additionally blocks `/cv/` and `/resume/cv/` even if a stale file is copied back. Private backups under `artifacts/private-cv/` must stay local.

Official references: [Nginx static serving and reloads](https://nginx.org/en/docs/beginners_guide.html), [Certbot webroot validation](https://eff-certbot.readthedocs.io/en/stable/using.html#webroot), [Certbot renewal hooks](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates), [Debian Certbot package](https://packages.debian.org/trixie/certbot), and [TransIP DNS settings](https://www.transip.nl/knowledgebase/527-de-dns-instellingen-van-mijn-webhostingpakket).
