#!/bin/sh
set -eu

if [ "$(id -u)" -ne 0 ]; then
    printf '%s\n' 'Run this script as root (or with sudo).' >&2
    exit 1
fi

package_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
site_dir="$package_dir/site"
base_dir=/var/www/robertwalhout.nl

if [ ! -f "$site_dir/index.html" ] || ! grep -q '<base href="/">' "$site_dir/index.html"; then
    printf '%s\n' 'Expected the packaged domain-root build in site/ next to this script.' >&2
    exit 1
fi

if [ -e "$base_dir/current" ] && [ ! -L "$base_dir/current" ]; then
    printf '%s\n' "$base_dir/current must be a symlink. Move the existing directory aside first." >&2
    exit 1
fi

install -d -m 755 "$base_dir" "$base_dir/releases"
release_dir=$(mktemp -d "$base_dir/releases/release-XXXXXXXX")
cp -R "$site_dir/." "$release_dir/"
chown -R root:root "$release_dir"
find "$release_dir" -type d -exec chmod 755 {} +
find "$release_dir" -type f -exec chmod 644 {} +
previous_release=$(readlink "$base_dir/current" || true)
next_link="$base_dir/.current-$(basename "$release_dir")"
ln -s "$release_dir" "$next_link"
mv -Tf "$next_link" "$base_dir/current"

printf 'Installed site: %s\n' "$release_dir"
if [ -n "$previous_release" ]; then
    printf 'Previous release (kept for rollback): %s\n' "$previous_release"
fi
