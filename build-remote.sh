#!/usr/bin/env bash

set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"

source .env

nix build .#pi-image --builders "ssh://serverbox.zone aarch64-linux"
readlink -f "$SCRIPT_DIR/result/sd-image/"*