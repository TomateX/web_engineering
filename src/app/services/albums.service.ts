import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {SearchService} from "./search.service";
import {Album} from "../model/album.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService implements OnDestroy{
  albums: Album[] = [];
  newAlbums = new Subject<Album[]>()
  subscription!: Subscription;

  constructor(private searchService: SearchService) {
    this.subscription = this.searchService.albums.subscribe((albums:any) => {
      this.albums = [];
      for(let i = 0; i < albums.length; i++){
        let id: string = albums[i].id;
        let name: string = albums[i].name;
        let img: string = 'assets/image/music.png';
        if(albums[i].images[0])
          img = albums[i].images[0].url;
        let uri: string = albums[i].uri;
        let artists: string[] = [];
        for(let z = 0; z < albums[i].artists.length; z++){
          artists.push(albums[i].artists[z].name);
        }
        this.albums.push({id, name, img, uri, artists});
      }
      this.newAlbums.next(this.albums);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
