import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {SearchService} from "./search.service";
import {Playlist} from "../model/playlist.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService implements OnDestroy{

  playlists: Playlist[] = [];
  newPlaylists = new Subject<Playlist[]>()
  subscription!: Subscription;

  constructor(private searchService: SearchService) {
    this.subscription = this.searchService.playlists.subscribe((playlists:any) => {
      this.playlists = [];
      for(let i = 0; i < playlists.length; i++){
        let id: string = playlists[i].id;
        let name: string = playlists[i].name;
        let img: string = 'assets/image/music.png';
        if(playlists[i].images[0])
          img = playlists[i].images[0].url;
        let uri: string = playlists[i].uri;
        let owner: string = playlists[i].owner.display_name;
        this.playlists.push({id, name, img, uri, owner});
      }
      this.newPlaylists.next(this.playlists);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
