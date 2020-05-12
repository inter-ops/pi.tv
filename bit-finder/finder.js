"use strict";
const config = require("./config");
const rarbgApi = require('rarbg-api');

const { Client } = require('imdb-api');
const imdbApi = new Client({ apiKey: config.omdb.apiKey });

const TorrentSearchApi = require('torrent-search-api');


// too many providers slows search significantly, using current best

TorrentSearchApi.enableProvider('1337x');
TorrentSearchApi.enableProvider('Rarbg');
//TorrentSearchApi.enableProvider('Yts');
//TorrentSearchApi.enableProvider('Eztv');


exports.search = async (name) => {
  const torrents = await TorrentSearchApi.search(name, 'Movies', 15);
  //const torrentHtmlDetail = await TorrentSearchApi.getTorrentDetails(torrent);

  return torrents
}

exports.getMagnet = async (torrent) => {
  const magnet = await TorrentSearchApi.getMagnet(torrent);
  return magnet;
}


// following functions are not currently used but could be useful in the future

exports.searchTorrents = async ({ imdbId, name }) => {
  // NOTE: specific episode id dont seem to work

  const torrents = await imdbId ?
    rarbgApi.search(imdbId, { limit: 25, sort: "seeders" }, "imdb") :
    rarbgApi.search(name, { limit: 25, sort: "seeders" })

  return torrents;
}

exports.searchImdb = async ({ name, first = false }) => {
  const { results } = await imdbApi.search({ name });

  // TODO: get all movie info - can do synchronously while torrents are searched
  /*
    if (first) {
      const info = await imdbApi.get({ id: results[0].imdbid })
    }
  */

  return first ? results[0] : results;
}
