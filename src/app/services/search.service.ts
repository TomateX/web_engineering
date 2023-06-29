import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  //Subjects für die einzelnen Typen
  albums = new Subject<any>();
  artists = new Subject<any>();
  playlists = new Subject<any>();
  tracks = new Subject<any>();


  //Error subject, falls ein Fehler auftritt
  error = new Subject<boolean>()


  //Suchmethode
  search(request: string, type: string) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(request)}&type=${type}&limit=50`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).pipe(
      catchError((error: any) => {
        console.log("Ein Fehler ist aufgetreten: " + error);
        this.error.next(true);
        return throwError(error);
      })
    ).subscribe((res: any) => {
      //Der Suchtyp wird gefiltert und die daten an das jeweilige Service weiter geleitet
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
      //Falls ein Fehler auftritt, wird das Errorsubject auf true gesetzt
      if (res.error) {
        this.error.next(true);
      } else {
        this.error.next(false);
      }
    });
  }
}
