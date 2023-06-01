export class Playlist {
  id: string;
  name: string;
  img: string;
  uri: string;
  owner: string;

  constructor(id: string, name: string, img: string, uri: string, owner: string) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.uri = uri;
    this.owner = owner;
  }
}
