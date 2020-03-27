# pi.tv

Setup scripts for a Pi Media server with Plex, PlexConnect, Airplay

### Setup

To setup Pi.TV, run `bash master-setup.sh` from a MacOS computer. The script will walk you through the setup and ensure you have the proper requirements installed.

Note that it will prompt you for your RPI domain and username to ssh into and perform host setup.

### Relevant URLs

Assuming you've added the following line to your /etc/hosts file: `{pi_ip} pi.tv`, here are the relevant URLs for this application

- http://pi.tv:9091/transmission/web: Transmission dashboard
- http://pi.tv:32400/web: Plex dashboard

### Pre-reqs

Anything needed prior to starting.

* SSH enabled on Pi
* Static IP address given to Pi
* Add `{static_pi_ip} pi.tv` to your <i>/etc/hosts</i> file (on your machine, not the Pi)
