#!/usr/bin/env bash

set -e

source .env

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"

UPLOAD_USER="$(whoami)"

echo "Sending local files to /home/$UPLOAD_USER/staubli"

rsync --archive --verbose --human-readable \
    --exclude='*.pyc' --delete-excluded \
    ./staubli/ $UPLOAD_USER@$HOST:/home/$UPLOAD_USER/staubli \
    --delete

ssh -t $UPLOAD_USER@$HOST "\
    echo 'Configuring .env' && \
    echo '# dev-staubli.sh' > .env && \
    echo 'SERIAL_DEVICE=/dev/ttyUSB0' >> .env && \
    echo 'HTTP_PORT=8000' >> .env && \
    echo 'Starting dev service' && \
    python -m 'staubli.http.main'\
"
