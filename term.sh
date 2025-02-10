#!/usr/bin/env bash

source .env

screen -S staubli -dm ${SERIAL_DEVICE} 9600
screen -S staubli -X caption always "%{= rw}Staubli terminal - ctrl+a \ to exit"
screen -r staubli
