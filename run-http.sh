#!/usr/bin/env bash

# Start the JS dev server (in staubli/html) and the Python API,
# keep both running and ensure both are killed on crash or Ctrl-C.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

start_js() {
	echo "Starting JS dev server (staubli/html)..."
	(cd "$SCRIPT_DIR/motion-loom" && npm run start)
}

start_py() {
	echo "Starting Python API (.venv)..."
	"$SCRIPT_DIR/.venv/bin/python" -m staubli.http.main
}

# Start both in background so their stdout/stderr appear in this terminal
start_js &
JS_PID=$!

start_py &
PY_PID=$!

cleanup() {
	echo "Stopping servers..."
	kill "$JS_PID" 2>/dev/null || true
	kill "$PY_PID" 2>/dev/null || true
	wait "$JS_PID" 2>/dev/null || true
	wait "$PY_PID" 2>/dev/null || true
}

trap 'cleanup; exit 0' INT TERM

# If either process exits, kill the other and exit with its status
while true; do
	if ! kill -0 "$JS_PID" 2>/dev/null; then
		wait "$JS_PID" || true
		echo "JS dev server exited; shutting down Python server"
		kill "$PY_PID" 2>/dev/null || true
		wait "$PY_PID" 2>/dev/null || true
		exit 1
	fi
	if ! kill -0 "$PY_PID" 2>/dev/null; then
		wait "$PY_PID" || true
		echo "Python API exited; shutting down JS dev server"
		kill "$JS_PID" 2>/dev/null || true
		wait "$JS_PID" 2>/dev/null || true
		exit 1
	fi
	sleep 1
done
