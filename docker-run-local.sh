#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-.env.local}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: env file '$ENV_FILE' not found."
  exit 1
fi

set -a
# shellcheck disable=SC1090
source <(grep -v '^\s*#' "$ENV_FILE" | grep -v '^\s*$')
set +a

docker run \
  -p 3000:3000 \
  -e TEAMVIEWER_API_SECRET_KEY="${TEAMVIEWER_API_SECRET_KEY:?}" \
  web-admin:local
