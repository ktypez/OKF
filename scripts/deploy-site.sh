#!/bin/bash
set -e

echo "Building site from KB..."
cd "$(dirname "$0")/.."
node scripts/build-site.js

echo "Deploying to Vercel..."
cd site
vercel deploy --prod --yes

echo "Done!"
