#!/bin/bash

# NOTE: this file needs to be run on the host machine

# TODO: add following lines to bashrc
#alias transmission-start="sudo /etc/init.d/transmission-daemon start"
#alias transmission-stop="sudo /etc/init.d/transmission-daemon stop"
#alias transmission-edit="transmission-stop && sudo nano /etc/transmission-daemon/settings.json && transmission-start"

# TODO: movies and tv folders should probs be made during hdd setup
echo "host.sh: creating media folders"
media_folder="/media/pi"
sudo mkdir $media_folder

pitv_folder=$media_folder/VirgaExternal
sudo mkdir $pitv_folder
sudo mkdir $pitv_folder/Torrents
sudo mkdir $pitv_folder/Movies
sudo mkdir $pitv_folder/TV

# TODO: move format-media.sh to $pitv_folder/Torrents

echo "host.sh: installing transmission-daemon"
sudo apt install transmission-daemon -y

echo "host.sh: stopping transmission"
transmission-stop

echo "host.sh: replacing /etc/transmission-daemon/settings.json"
# TODO: replace settings.json with the one in this folder

echo "host.sh: starting tranmission"
transmission-start
