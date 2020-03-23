#!/bin/bash

# NOTE: this file needs to be run on the host machine

temp_dir="~/PlexConnect"
certs_dir="~/PlexConnectCerts"
plex_connect_dir="/usr/local/lib/PlexConnect"

# download and extract PlexConnect
wget https://github.com/iBaa/PlexConnect/archive/V0.7.tar.gz
mkdir $temp_dir
tar -xvzf V0.7.tar.gz -C $temp_dir
rm V0.7.tar.gz

# at this point we expect PlexConnectCerts to have been
# transfered to host
echo "host.sh: transferring certificates into PlexConnect"
mv $certs_dir/trailers.* $temp_dir/assets/certificates/
rm -rf $certs_dir

# move to proper location
echo "host.sh: moving PlexConnect from $temp_dir to $plex_connect_dir"
sudo mv $temp_dir $plex_connect_dir

echo "host.sh: starting PlexConnect"
echo "host.sh: WARNING - do not stop PlexConnect until setup is complete"
sudo $plex_connect_dir/PlexConnect.py

# TODO: copy down IP address of host from output

# TODO: autostart
# https://github.com/iBaa/PlexConnect/wiki/nix-autostart
# https://forums.plex.tv/t/plexconnect-on-archlinux/55982
# https://forums.plex.tv/t/plexconnect-and-raspberry-pi/83826/6
