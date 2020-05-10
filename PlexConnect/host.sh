#!/bin/bash

# NOTE: this file needs to be run on the host machine

plex_connect_version=0.7
plex_connect_tar=V$plex_connect_version.tar.gz

temp_dir=/home/pi/PlexConnect
certs_dir=/home/pi/PlexConnectCerts
plex_connect_dir=/usr/local/lib/PlexConnect

# download and extract PlexConnect
echo "host.sh: downloading PlexConnect"
wget https://github.com/iBaa/PlexConnect/archive/$plex_connect_tar
#tar -xvzf $plex_connect_tar -C $temp_dir
tar -xvzf $plex_connect_tar
mv PlexConnect-$plex_connect_version $temp_dir
rm $plex_connect_tar

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

# daemon commands
# sudo ./PlexConnect_daemon.bash start
# sudo ./PlexConnect_daemon.bash status
# sudo ./PlexConnect_daemon.bash stop

# autostart
# https://www.raspberrypi.org/forums/viewtopic.php?t=184319
# TODO: if /etc/dhcpcd.enter-hook doesnt exist, need to create it
sudo echo "#!/bin/bash;plex_connect_dir=/usr/local/lib/PlexConnect;sudo $plex_connect_dir/PlexConnect_daemon.bash start" | sudo tee -a /etc/dhcpcd.enter-hook

# TODO: scp entire bitfinder folder to host and setup + start
