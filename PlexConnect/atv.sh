#!/bin/bash

# this comes from master-setup.sh
host_ip=$1

# TODO: if no host_ip, prompt

echo "atv.sh: configuring Apple TV DNS settings"

echo "atv.sh: USER ACTION REQUIRED"
echo "    - On your Apple TV, navigate to Settings > General > Network > Wi-Fi > {network_name}"
echo "    - set DNS to 'Manual'"
echo "    - set DNS IP to '$host_ip'"

read -p "atv.sh: when complete, press ENTER to continue..."


echo "atv.sh: configuring Apple TV certificates"

echo "atv.sh: USER ACTION REQUIRED"
echo "    - On your Apple TV, navigate to Settings > General"
echo "    - set 'Send Data To Apple' to 'No'"
echo "    - highlight 'Send Data To Apple' and press 'Play' (on ATV remote). Enter 'http://trailers.apple.com/trailers.cer'"

read -p "atv.sh: when complete, press ENTER to continue..."
