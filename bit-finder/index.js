"use strict";
const { searchTorrents, searchImdb } = require("./finder");
const parser = require("./parser");

const minSeeders = 5
const maxSize = 5000000000 // 5 GB

const main = async () => {
  try {
    // TODO: if not found, search rarbg directly with name
    const imdbInfo = await searchImdb({ name: "martian", first: true })
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
  }
  catch(err) {
    console.error(err);
  }
}


main()
