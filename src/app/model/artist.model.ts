export class Artist {
  id: string;
  name: string;
  img: string;
  uri: string;

  constructor(id: string, name: string, img: string, uri: string) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.uri = uri;
  }
}
