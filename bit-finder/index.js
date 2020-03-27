"use strict";
const rarbgApi = require('rarbg-api')

const minSeeders = 5
const maxSize = 5000000000 // 5 GB

const main = async () => {
  try {
    // NOTE: specific episode codes dont seem to work
    const torrents = await rarbgApi.search("tt2707408", {
      limit: 10,
      sort: "seeders"
    }, "imdb");

    //console.log("length: " + torrents.length);

    // TODO: ensure movie name is in torrent title
    const filtered = torrents.map(t => {
      t = parseGeneral(t)
      switch (t.category) {
        case "TV HD Episodes":
        case "TV Episodes":
          return parseTv(t)
        default:
          return parseMovie(t);
      }
    })

    console.log("length: " + filtered.length);
    //console.log(filtered);

    if (filtered.length === 0) {
      console.error("No torrents found");
      process.exit(1)
    }

    const chosen = torrents[0]
    if (chosen.seeders < minSeeders) console.warn("Seeders < 5");
    if (chosen.size > maxSize) console.warn("Size > 5GB");

    console.log(chosen);
  }
  catch(err) {
    console.error(err);
  }
}

function parseTv(torrent) {
  let type;
  let { title: episode, epnum, seasonnum: ssnum } = torrent.episode_info;

  const match = torrent.title.match(/s(\d{1,2})e?(\d{0,3})/i)

  if (!epnum && match[1]) epnum = match[1]

  if (!epnum || parseInt(epnum) > 5000) {
    epnum = undefined;
    type = "Season"
  }
  else {
    type = "Episode"
    epnum = parseInt(epnum);
  }

  ssnum = parseInt(ssnum);

  // TODO: format title

  // NOTE: if its a whole season, title looks like this: Season Pack 3

  return {
    ...torrent,
    episode,
    epnum,
    ssnum,
    type
  }
}

function parseMovie(torrent) {
  // category = Movies|TV Episodes
  // codec = x264, XVID
  // quality = 1080

  const { quality, codec, category } = torrent

  // TODO: format title

  return {
    ...torrent,
    type: "Movie"
  };
}

function parseGeneral(torrent) {

  const blueray = torrent.title.match(/blu[-_]?ray/i) !== undefined;

  let [category, codec, quality] = torrent.category && torrent.category.split("/")

  if (!quality) {
    // when quality isnt provided it can sometimes be found in the title
    const match = torrent.title.match(/\d{3,4}p/i)
    quality = match && match[0]
  }

  //console.log(torrent.title);

  // quality can be undefined
  //return !quality || quality >= 720

  return {
    ...torrent,
    quality,
    blueray,
    codec,
    category
  };
}

main()
