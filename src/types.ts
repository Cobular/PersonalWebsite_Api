export interface LastFmData {
  name: string,
  artist: string,
  thumb: string,
  url: string
}

export enum ActivityType {
  Game = "Game",
  Sleep = "Sleep",
  Lecture = "Lecture",
  Homework = "Homework",
  Programming = "Programming",
  Relaxing = "Relaxing",
  Unknown = "Unknown"
}

export interface ActivityData {
  time: number,
  activity: ActivityType,
  altText?: string

}