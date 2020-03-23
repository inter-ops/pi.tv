# PlexConnect Setup

This setup closely follows the [Official Install Guide](https://github.com/iBaa/PlexConnect/wiki/Install-Guide).

For our case, the host is a Raspberry Pi 3 (soon to be 4 🎉) running Raspbian.

### Host Requirements

* Python 2.7.x installed
* [Plex Media Server](https://www.plex.tv) up and running
* Static IP address

### Setup

PlexConnect scripts must be run in the following order:

* certs.sh
* host.sh
* atv.sh

Certain scripts require certain inputs, so it is recommended to use `master-setup.sh` instead of manually running each script.
