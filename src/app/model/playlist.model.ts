import {Track} from "./track.model";

export class Playlist {
  id: string;
  name: string;
  img: string;
  uri: string;
  owner: string;
  tracks: Track[];

  constructor(id: string, name: string, img: string, uri: string, owner: string) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.uri = uri;
    this.owner = owner;
    this.tracks = [];
  }
}
