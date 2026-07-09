#!/bin/bash
set -e

OKF_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SITE_DIR="$OKF_DIR/site"

echo "Building site from KB..."
node "$OKF_DIR/scripts/build-site.js"

echo "Deploying to Vercel..."
cd "$SITE_DIR"
vercel deploy --prod --yes

echo "Done!"
