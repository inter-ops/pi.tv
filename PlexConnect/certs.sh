#!/bin/bash

# $1 comes from master-setup.sh
host=$1

# TODO: if host == null, prompt user for host

local_path="~/Desktop/PlexConnectCerts"
host_path="$host:~/PlexConnectCerts"

echo "certs.sh: creating certificates in $local_path"

mkdir $local_path
openssl req -new -nodes -newkey rsa:2048 -out $local_path/trailers.pem -keyout $local_path/trailers.key -x509 -days 7300 -subj "/C=US/CN=trailers.apple.com"
openssl x509 -in $local_path/trailers.pem -outform der -out $local_path/trailers.cer && cat ~/Desktop/trailers.key >> $local_path/trailers.pem

echo "certs.sh: transferring certificates to $host_path"

scp -r $local_path $host_path
