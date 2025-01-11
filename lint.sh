#!/bin/bash -e

ensure_linter() {
  if [[ ! -f ".venv-dev/bin/black" ]]; then
    virtualenv .venv-dev
    .venv-dev/bin/pip install -r requirements-dev.txt
  fi
}

if [[ "$1" == "--check" ]]; then
  ensure_linter
  .venv-dev/bin/black --check robot || \
    (echo "lint failed on the above files, run ./lint.sh --fix" && exit 1)
  .venv-dev/bin/black --check tests || \
    (echo "lint failed on the above files, run ./lint.sh --fix" && exit 1)
elif [[ "$1" == "--fix" ]]; then
  ensure_linter
  .venv-dev/bin/black robot
  .venv-dev/bin/black tests
else
  echo "Usage: ./lint.sh [--check | --fix]"
fi
