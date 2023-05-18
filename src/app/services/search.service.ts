import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  items: any;
  newItems = new Subject<any>();

  search(request: string) {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(request)}&type=track&limit=50`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(url, { headers }).subscribe((data: any) => {
      this.items = data.tracks.items;
      this.newItems.next(this.items);
    });
  }

}
