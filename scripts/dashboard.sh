#!/bin/bash
# OKF Dashboard — start / stop / rebuild
# Usage: bash scripts/dashboard.sh <start|stop|restart|rebuild>
#   start   — serve dashboard.html on port 8080 (background) 
#   stop    — kill the HTTP server
#   restart — stop + start
#   rebuild — regenerate dashboard.html from graph.json

OKF_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
PID_FILE="$OKF_ROOT/.dashboard.pid"
PORT=${OKF_DASHBOARD_PORT:-8080}

case "${1:-help}" in
  start)
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
      echo "Dashboard already running (PID $(cat "$PID_FILE"))"
      exit 1
    fi
    cd "$OKF_ROOT"
    nohup python3 -m http.server "$PORT" >/dev/null 2>&1 &
    echo $! > "$PID_FILE"
    echo "OKF Dashboard → http://localhost:$PORT/  (PID $!)"
    ;;
  stop)
    if [ ! -f "$PID_FILE" ]; then
      echo "No dashboard PID file found"
      exit 1
    fi
    PID=$(cat "$PID_FILE")
    kill "$PID" 2>/dev/null && echo "Dashboard stopped (PID $PID)" || echo "Dashboard not running"
    rm -f "$PID_FILE"
    ;;
  restart)
    "$0" stop
    sleep 1
    "$0" start
    ;;
  rebuild)
    cd "$OKF_ROOT"
    node scripts/build-graph.js && node scripts/build-dashboard.js
    echo "Dashboard rebuilt at dashboard.html"
    ;;
  *)
    echo "Usage: $0 <start|stop|restart|rebuild>"
    exit 1
    ;;
esac
