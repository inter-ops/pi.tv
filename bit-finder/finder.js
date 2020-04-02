"use strict";
const config = require("./config");
const rarbgApi = require('rarbg-api');

const { Client } = require('imdb-api');
const imdbApi = new Client({ apiKey: config.omdb.apiKey });

//console.log(rarbgApi.CATEGORY);

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
