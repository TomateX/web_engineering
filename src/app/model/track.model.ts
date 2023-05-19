export class Track{
  id: string;
  name: string;
  img: string;
  uri: string;
  artists: string[];

  constructor(id: string, name: string, img: string, uri: string, artists: string[]) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.uri = uri;
    this.artists = artists;
  }

}
