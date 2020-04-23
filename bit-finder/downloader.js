"use strict";
const config = require("./config")

const Transmission = require('transmission-promise')
const transmission = new Transmission({
  host: 'pi.tv',
  port: 9091,
  username: config.transmission.username,
  password: config.transmission.password,
  //ssl: true,
  url: "/transmission/rpc"
})

exports.addTorrent = async (torrent) => {
  const res = await transmission.add(torrent.download)
  console.log(res);
  return res;
}
