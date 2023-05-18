export class Track{
  id: string;
  name: string;
  img: string;
  artists: string[];

  constructor(id: string, name: string, img: string, artists: string[]) {
    this.id =  id;
    this.name = name;
    this.img = img;
    this.artists = artists;
  }

}
