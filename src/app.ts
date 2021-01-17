import express from "express"
import LastFM from "lastfm"

interface LastFmData {
  name: string,
  artist: string,
  thumb: string
}

const app = express()
const port = 3000
const api_root = "http://ws.audioscrobbler.com/2.0"
let nowPlayingSong: LastFmData = {
  name: undefined,
  artist: undefined,
  thumb: undefined
}

let config = process.env.CONFIG ? JSON.parse(process.env.CONFIG) : require("../dist/config.json")

const lastfm = new LastFM.LastFmNode({
  api_key: config.keys.lastfm.key,
  secret: config.keys.lastfm.secret,
  useragent: "me.jakecover.me/express+node" + process.version + " (see jakecover.me)",
})

const lastFmStream = lastfm.stream(config.keys.lastfm.username)
lastFmStream.start()

lastFmStream.on("nowPlaying", function(track: LastFmData) {
  nowPlayingSong = track
})

lastFmStream.on("stoppedPlaying", function(track) {
  nowPlayingSong = {
    name: undefined,
    artist: undefined,
    thumb: undefined
  }
})


function nowPlaying() {
  if (nowPlayingSong.name) {
    return {
      track: nowPlayingSong.name,
      artist: nowPlayingSong.artist["#text"],
      // image: nowPlayingSong.image[nowPlayingSong.image.length - 1]["#text"] || "http://a5.mzstatic.com/us/r30/Purple3/v4/54/24/28/54242884-8dd5-83cb-1996-4a21295955de/icon175x175.png",
      playing: true,
    }
  } else {
    return {
      track: "Nothing",
      artist: "Nobody",
      // image: "http://a5.mzstatic.com/us/r30/Purple3/v4/54/24/28/54242884-8dd5-83cb-1996-4a21295955de/icon175x175.png",
      playing: false,
    }
  }
}

function getMyData() {
  return {
    introduction: "Welcome to my site! It seems like you've found my API. Right now, there's not much here, but I " +
      "plan to add more stuff soon :tm:. Anyway, shoot me an email at me@cobular.com to say hi if ya want. Have fun " +
      "looking around here!",
    lastfm: nowPlaying(),
  }
}

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/json")
  res.json(getMyData())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
