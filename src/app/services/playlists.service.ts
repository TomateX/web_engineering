import {Injectable, OnDestroy} from '@angular/core';
import {catchError, Subject, Subscription, throwError} from "rxjs";
import {SearchService} from "./search.service";
import {Playlist} from "../model/playlist.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Track} from "../model/track.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService implements OnDestroy{


  //Array mit allen Playlists die gefunden wourden sind
  playlists: Playlist[] = [];
  newPlaylists = new Subject<Playlist[]>()

  //Ausgewählte Playlist
  selectedPlaylist: Playlist = new Playlist('', '', '', '', '');
  newSelectedPlaylist = new Subject<Playlist>();

  //Subscription
  searchSubscription!: Subscription;
  playlistSubscription!: Subscription;

  constructor(private searchService: SearchService, private http: HttpClient) {
    //Subscription für die Playlist die vom searchService gefunden worden sind
    this.searchSubscription = this.searchService.playlists.subscribe((playlists:any) => {
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

  //Methode für den HTTP Request für die Songs der ausgewählten Playlist
  getPlaylistApi(id: string){
    const url = 'https://api.spotify.com/v1/playlists/'+id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.playlistSubscription = this.http.get(url, { headers }).pipe(
      catchError((error: any) => {
        console.log("Ein fehler ist aufgetreten: " + error);
        return throwError(error);
      })
    ).subscribe((res: any) => {
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
    });
  }

  //Gibt die ausgewählte Playlist zurück
  getSelectedPlaylist(){
    return this.selectedPlaylist;
  }

  //Manuelles unsubscribe von den Subscriptions
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.playlistSubscription.unsubscribe();
  }
}
