import { ActivityData, ActivityType, LastFmData } from "./types"

export function choose(choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

export function nowPlaying(lastFmData1: LastFmData) {
  if (lastFmData1.name) {
    return {
      track: lastFmData1.name,
      artist: lastFmData1.artist["#text"],
      // image: lastFmData.image[lastFmData.image.length - 1]["#text"] || "http://a5.mzstatic.com/us/r30/Purple3/v4/54/24/28/54242884-8dd5-83cb-1996-4a21295955de/icon175x175.png",
      playing: true,
      url: lastFmData1.url,
    }
  } else {
    return {
      track: "Nothing",
      artist: "Nobody",
      // image: "http://a5.mzstatic.com/us/r30/Purple3/v4/54/24/28/54242884-8dd5-83cb-1996-4a21295955de/icon175x175.png",
      playing: false,
      url: "",
    }
  }
}


export function handleActivity(activityData, config) {
  return (req, res) => {
    if (!("secret_key" in req.query) && req.query.secret_key !== config.keys.activity.secret_key) {
      res.status(401)
      res.send("Unauthorized")
    }
    let activity = ActivityType.Unknown
    switch (req.query.activity) {
      case "Game":
        activity = ActivityType.Game
        break
      case "Sleep":
        activity = ActivityType.Sleep
        break
      case "Homework":
        activity = ActivityType.Homework
        break
      case "Lecture":
        activity = ActivityType.Lecture
        break
      case "Programming":
        activity = ActivityType.Programming
        break
      case "Relaxing":
        activity = ActivityType.Relaxing
        break
    }
    if ("alt_text" in req.query) {
      activityData = {
        activity: activity,
        time: new Date().getTime(),
        altText: req.query.alt_text as string,
      }
    } else {
      activityData = {
        activity: activity,
        time: new Date().getTime(),
      }
    }
    res.status(200)
    res.send(choose(["pog", "a-ok!", "yee haw", "ok", "cool", "gottcha", "seen", "ack"]))
  }
}


export function getMyData(lastFmData1: LastFmData, activity: ActivityData) {
  return {
    introduction: "Welcome to my site! It seems like you've found my API. Right now, there's not much here, but I " +
      "plan to add more stuff soon :tm:. Anyway, shoot me an email at me@cobular.com to say hi if ya want. Have fun " +
      "looking around here!",
    lastfm: nowPlaying(lastFmData1),
    activity: activity,
  }
}