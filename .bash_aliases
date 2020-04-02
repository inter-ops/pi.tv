# Transission
alias transmission-start="sudo /etc/init.d/transmission-daemon start"
alias transmission-stop="sudo /etc/init.d/transmission-daemon stop"
alias transmission-edit="transmission-stop && sudo nano /etc/transmission-daemon/settings.json && transmission-start"

# Plex
alias plex-update="sudo apt-get update && sudo apt-get upgrade; sudo apt-get install plexmediaserver -y"
alias plex-restart="sudo service plexmediaserver restart"

