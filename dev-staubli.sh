#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"

echo "Sending local files to /root/staubli"

UPLOAD_USER="$(whoami)"

rsync --archive --verbose --human-readable \
    --exclude='*.pyc' --delete-excluded \
    ./staubli/ $UPLOAD_USER@staubli:/home/$UPLOAD_USER/staubli \
    --delete

ssh -t $UPLOAD_USER@staubli "\
    echo 'Configuring .env' && \
    echo '# dev-staubli.sh' > .env && \
    echo 'SERIAL_DEVICE=/dev/tty.usbserial-10' >> .env && \
    echo 'HTTP_PORT=8000' >> .env && \
    echo 'Starting dev service' && \
    python -m 'staubli.http.main'\
"
