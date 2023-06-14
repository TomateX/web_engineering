import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  albums = new Subject<any>();
  artists = new Subject<any>();
  playlists = new Subject<any>();
  tracks = new Subject<any>();

  search(request: string, type: string) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(request)}&type=${type}&limit=50`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).subscribe((res: any) => {
      switch (type){
        case 'album':
          this.albums.next(res.albums.items);
          break;
        case 'artist':
          this.artists.next(res.artists.items);
          break;
        case 'playlist':
          this.playlists.next(res.playlists.items);
          break;
        case 'track':
          this.tracks.next(res.tracks.items);
          break;
      }
    });
  }
}
