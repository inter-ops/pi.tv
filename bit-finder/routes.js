"use strict";
const express = require('express');
const router = express.Router();
const finder = require("./finder");
const parser = require("./parser");
const downloader = require("./downloader")
const minSeeders = 5
const maxSize = 5000000000 // 5 GB

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bit-Finder' });
});

// TODO: get list, click row will send that torrent to transmission
router.get("/torrents", async (req, res, next) => {
  try {
    const { name, shouldAdd } = req.query;

    if (!name || name === "") throw new Error("No name provided")

    const torrents = await finder.search(name)

    if (torrents.length === 0) {
      console.error("No torrents found");
      return res.status(204).send()
    }

    const chosen = torrents[0]
    console.log("Chosen torrent:\n", chosen);

    if (shouldAdd) await downloader.addTorrent(chosen)

    //return res.status(201).send(chosen)
    return res.render('torrents', chosen);
  }
  catch(err) {
    return next(err)
  }
})


/*
router.post("/torrents", async (req, res, next) => {
  try {
    const { name, shouldAdd } = req.body;
    if (!name || name === "") throw new Error("No title provided")


    // TODO: if not found, search rarbg directly with name
    const imdbInfo = await searchImdb({ name, first: true })
    //console.log(imdbInfo);

    if (!imdbInfo) console.log("Warning: Movie not found in IMDB");

    const torrents = await searchTorrents({ imdbId: imdbInfo.imdbid })
    //console.log(torrents);

    // TODO: ensure movie name is in parsed torrent title
    // put this all in the main parse function
    const filtered = torrents.reduce((filtered, t) => {
      t = parser.general(t)

      if (t.category.toLowerCase().includes("tv")) t = parser.tv(t);
      else if (t.category.toLowerCase().includes("movie")) t = parser.movie(t);
      else t = undefined

      if (t) filtered.push(t)

      return filtered;
    }, []);

    // TODO: if none, search rarbg directly with name
    if (filtered.length === 0) {
      console.error("No torrents found");
      process.exit(1)
    }

    console.log(`Torrents: ${torrents.length}, after filtering: ${filtered.length}`);

    const chosen = filtered[0]
    console.log("Chosen torrent:\n", chosen);

    if (chosen.seeders < minSeeders) console.warn("Warning: Seeders < 5");
    if (chosen.size > maxSize) console.warn("Warning: Size > 5GB");

    if (shouldAdd) await downloader.addTorrent(chosen)
    return res.status(201).send(chosen)
  }
  catch(err) {
    return next(err)
  }
})
*/
module.exports = router;
