#!/bin/bash

###################################################
############ Master setup/walk-through ############
###################################################

echo "Setting up Pi.TV..."

echo "Please provide host URL for scp & ssh in the following format: '{user}@{domain|ip}'"
read -p "Host: " host_url

# TODO: plex media server
# TODO: transmission

echo "Setting up PlexConnect"
echo "Running ./PlexConnect/certs.sh"
./PlexConnect/certs.sh $host_url

echo "Running ./PlexConnect/host.sh"
# TODO: run the following in host
#./PlexConnect/host.sh

echo "Running ./PlexConnect/atv.sh"
