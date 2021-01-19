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


export function getMyData(lastFmData1: LastFmData, activity: ActivityData) {
  return {
    introduction: "Welcome to my site! It seems like you've found my API. Right now, there's not much here, but I " +
      "plan to add more stuff soon :tm:. Anyway, shoot me an email at me@cobular.com to say hi if ya want. Have fun " +
      "looking around here!",
    lastfm: nowPlaying(lastFmData1),
    activity: activity,
  }
}