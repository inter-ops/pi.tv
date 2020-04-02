#!/bin/bash

# this comes from master-setup.sh
# TODO: if no host_ip, prompt
host_ip=$1

# normalize IP address to avoid confusion when entering into ATV settings
IFS=. read -a params <<< "$host_ip"

for block in "${params[@]}"; do
  missing=`expr 3 - ${#block}`

  if [ "$missing" -ne "0" ]; then
    block=$(printf '0%.0s' $(seq 1 $missing))$block
  fi

  normalized_host_ip=${normalized_host_ip}${block}.
done

# remove last period
normalized_host_ip=$(echo $normalized_host_ip | sed 's/.$//')

echo "atv.sh: configuring Apple TV DNS settings"

echo "atv.sh: USER ACTION REQUIRED"
echo "    - On your Apple TV, navigate to Settings > General > Network > Wi-Fi > {network_name}"
echo "    - set DNS to 'Manual'"
echo "    - set DNS IP to '$normalized_host_ip'"

read -p "atv.sh: when complete, press ENTER to continue..."


echo "atv.sh: configuring Apple TV certificates"

echo "atv.sh: USER ACTION REQUIRED"
echo "    - On your Apple TV, navigate to Settings > General"
echo "    - set 'Send Data To Apple' to 'No'"
echo "    - highlight 'Send Data To Apple' and press 'Play' (on ATV remote). Enter 'http://trailers.apple.com/trailers.cer'"

read -p "atv.sh: when complete, press ENTER to continue..."
