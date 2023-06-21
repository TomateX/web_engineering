import {Track} from "./track.model";

export class Album {
  id: string;
  name: string;
  img: string;
  uri: string;
  artists: string[];
  tracks: Track[];

  constructor(id: string, name: string, img: string, uri: string, artists: string[]) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.uri = uri;
    this.artists = artists;
    this.tracks = [];
  }

  setTracks(newTracks: Track[]){
    this.tracks = newTracks;
  }
}
