"use strict";
const config = require("./config")

const Transmission = require('transmission-promise')
const transmission = new Transmission({
  host: 'localhost',
  port: 9091,
  username: config.transmission.username,
  password: config.transmission.password,
  //ssl: true,
  url: "/transmission/rpc"
})

exports.addTorrent = async (torrent) => {
  console.log("Adding torrent to transmission");
  const res = await transmission.add(torrent.magnet)
  console.log(res);
  return res;
}
