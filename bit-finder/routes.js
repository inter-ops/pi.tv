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

router.get("/torrents", async (req, res, next) => {
  try {
    const { name, shouldAdd } = req.query;

    if (!name || name === "") return res.render('torrents', {});

    const torrents = await finder.search(name)

    if (torrents.length === 0) console.log("No torrents found");

    if (shouldAdd === "true" || shouldAdd === true) await downloader.addTorrent(chosen)

    let htmlResults = `
      <h3>Torrents:</h3>
      <table>
        <tr><th>Title</th><th>Seeds</th><th>Peers</th><th>Size</th><th>Provider</th><th>Download</th></tr>
        ${torrents.map(torrent => {
          return `
            <tr>
              <td>${torrent.title}</td>
              <td>${torrent.seeds}</td>
              <td>${torrent.peers}</td>
              <td>${torrent.size}</td>
              <td>${torrent.provider}</td>
              <td>
                <form action="/api/torrents" method="post">
                  <button name="magnet" value=${torrent.magnet}>Add</button>
                </form>
              </td>
            </tr>
          `
        })}
      </table>
    `
    return res.render('torrents', { htmlResults });
  }
  catch(err) {
    return next(err)
  }
})

router.post("/api/torrents", async (req, res, next) => {
  const { magnet } = req.body;
  console.log("Magnet: " + magnet);

  // TODO: add to transmission

  const htmlResults = `Success!!!`
  return res.render('torrents', { htmlResults });
})


module.exports = router;
