#!/usr/bin/env bash

set -e

HOST=staubli

SYSTEM=$(nix build \
    .#nixosConfigurations.$HOST.config.system.build.toplevel \
    --builders "ssh://serverbox.zone aarch64-linux" \
    --no-link --print-out-paths)

nix copy --no-check-sigs --to ssh-ng://root@$HOST $SYSTEM

# lol this is a trip
ssh root@$HOST " \
    nix-env -p /nix/var/nix/profiles/system --set ${SYSTEM} \
    && ${SYSTEM}/bin/switch-to-configuration switch \
    && nix-collect-garbage \
    && systemctl restart staubli-http"
