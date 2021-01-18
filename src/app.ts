import express from "express"
import LastFM from "lastfm"
import cors from "cors"
import bodyParser from "body-parser"
import { ActivityData, ActivityType, LastFmData } from "./types"
import { getMyData, handleActivity, nowPlaying } from "./helper_funcs"

export const app = express()
app.use(cors({ origin: false }))
const port = 3000

let lastFmData: LastFmData = {
  name: undefined,
  artist: undefined,
  thumb: undefined,
  url: undefined,
}
let activityData: ActivityData = {
  time: new Date().getTime(),
  activity: ActivityType.Unknown,
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
  lastFmData = track
})

lastFmStream.on("stoppedPlaying", function() {
  lastFmData = {
    name: undefined,
    artist: undefined,
    thumb: undefined,
    url: undefined,
  }
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/activity", handleActivity(activityData, config))

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")
  res.json(getMyData(lastFmData, activityData))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
