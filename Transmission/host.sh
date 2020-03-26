#!/bin/bash

# NOTE: this file needs to be run on the host machine

# TODO: instead of just aliasing, save these in .bashrc
echo "host.sh: adding transmission aliases"
alias transmission-start="sudo /etc/init.d/transmission-daemon start"
alias transmission-stop="sudo /etc/init.d/transmission-daemon stop"
alias transmission-edit="sudo nano /etc/transmission-daemon/settings.json"

# TODO: movies and tv folders should probs be made during hdd setup
echo "host.sh: creating media folders"
media_folder="/media/pi/PiTV"
mkdir $media_folder
mkdir $media_folder/Torrents
mkdir $media_folder/Movies
mkdir $media_folder/TV

echo "host.sh: installing transmission-daemon"
sudo apt install transmission-daemon

echo "host.sh: stopping transmission"
transmission-stop

echo "host.sh: replacing /etc/transmission-daemon/settings.json"
# TODO: replace settings.json with the one in this folder

echo "host.sh: starting tranmission"
transmission-start
