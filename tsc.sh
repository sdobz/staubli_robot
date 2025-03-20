#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

tsc --project "$SCRIPT_DIR/staubli/html/tsconfig.json" --noEmit "$@"
