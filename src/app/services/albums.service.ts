import {Injectable, OnDestroy} from '@angular/core';
import {catchError, Subject, Subscription, throwError} from "rxjs";
import {SearchService} from "./search.service";
import {Album} from "../model/album.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Track} from "../model/track.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService implements OnDestroy{

  //Array mit allen Alben die gefunden worden sind
  albums: Album[] = [];
  newAlbums = new Subject<Album[]>()

  //Album welches ausgewählt wurde
  selectedAlbum: Album = new Album('', '', '', '', []);
  newSelectedAlbum = new Subject<Album>();


  searchSubscription!: Subscription;
  albumSubscription!: Subscription;

  constructor(private searchService: SearchService, private http: HttpClient) {

    //Subscription für die Alben die vom Searchservice geliefert werden
    this.searchSubscription = this.searchService.albums.subscribe((albums:any) => {
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
        this.albums.push(new Album(id, name, img, uri, artists));
      }
      this.newAlbums.next(this.albums);
    })
  }

  //HTTP Request für die Songs eines ausgewählten Albums
  getAlbumApi(id: string){
    const url = 'https://api.spotify.com/v1/albums/'+id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.albumSubscription = this.http.get(url, { headers }).pipe(
      catchError((error: any) => {
        console.log("Ein fehler ist aufgetreten: " + error);
        return throwError(error);
      })
    ).subscribe((res: any) => {
      this.selectedAlbum.uri = res.uri;
      this.selectedAlbum.id = res.id;
      this.selectedAlbum.img = res.images[0].url;
      this.selectedAlbum.name = res.name;
      this.selectedAlbum.artists = [];
      for(let i = 0; i < res.artists.length; i++){
        this.selectedAlbum.artists.push(res.artists[i].name);
      }
      let tracks: Track[] = [];
      for(let i = 0; i < res.tracks.items.length; i++){
        let resTrack = res.tracks.items[i];
        let creators: string[] = [];
        for (let z = 0; z < resTrack.artists.length; z++){
          creators.push(resTrack.artists[z].name);
        }
        tracks.push(new Track(resTrack.id, resTrack.name, res.images[0].url, resTrack.uri, creators));
      }
      this.selectedAlbum.tracks = tracks;
      this.newSelectedAlbum.next(this.selectedAlbum);
    });
  }

  //Gibt das ausgewählte Album zurück
  getSelectedAlbum(){
    return this.selectedAlbum;
  }

  //Manuelles unsubscribe der Subscription
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.albumSubscription.unsubscribe();
  }
}
