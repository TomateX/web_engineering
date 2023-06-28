import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {SearchService} from "./search.service";
import {Playlist} from "../model/playlist.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Track} from "../model/track.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService implements OnDestroy{

  playlists: Playlist[] = [];
  newPlaylists = new Subject<Playlist[]>()
  selectedPlaylist: Playlist = new Playlist('', '', '', '', '');
  newSelectedPlaylist = new Subject<Playlist>();
  subscription!: Subscription;

  waitForRequest = new Subject<boolean>();

  constructor(private searchService: SearchService, private http: HttpClient) {
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
        this.playlists.push(new Playlist(id, name, img, uri, owner));
      }
      this.newPlaylists.next(this.playlists);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getSelectedPlaylist(){
    return this.selectedPlaylist;
  }

  getPlaylistApi(id: string){
    this.waitForRequest.next(true);
    const url = 'https://api.spotify.com/v1/playlists/'+id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(url, { headers }).subscribe((res: any) => {
      this.selectedPlaylist.uri = res.uri;
      this.selectedPlaylist.id = res.id;
      this.selectedPlaylist.img = res.images[0].url;
      this.selectedPlaylist.name = res.name;
      this.selectedPlaylist.owner = res.owner.display_name;
      let tracks: Track[] = [];
      for(let i = 0; i < res.tracks.items.length; i++){
        let resTrack = res.tracks.items[i].track;
        let creators: string[] = [];
        for (let z = 0; z < resTrack.artists.length; z++){
          creators.push(resTrack.artists[z].name);
        }
        tracks.push(new Track(resTrack.id, resTrack.name, resTrack.album.images[0].url, resTrack.uri, creators));
      }
      this.selectedPlaylist.tracks = tracks;
      this.newSelectedPlaylist.next(this.selectedPlaylist);
      this.waitForRequest.next(false);
    });
  }
}
