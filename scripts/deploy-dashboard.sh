#!/bin/bash
# OKF Dashboard — deploy to Vercel
# Usage: bash scripts/deploy-dashboard.sh [dev|preview|prod]

OKF_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
DASHBOARD_DIR="$OKF_ROOT/dashboard"

case "${1:-help}" in
  dev)
    echo "Starting Vercel dev server..."
    cd "$DASHBOARD_DIR" && npx vercel dev
    ;;
  prod|deploy)
    echo "Deploying to Vercel (production)..."
    cd "$DASHBOARD_DIR" && npx vercel --prod
    ;;
  preview)
    echo "Deploying to Vercel (preview)..."
    cd "$DASHBOARD_DIR" && npx vercel
    ;;
  *)
    echo "Usage: $0 <dev|preview|prod>"
    echo "  dev     — local dev server (port 3000)"
    echo "  preview — deploy preview URL"
    echo "  prod    — deploy to production"
    exit 1
    ;;
esac
