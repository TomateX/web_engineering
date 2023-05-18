import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  items: any;
  newItems?: Subject<any>;

  search(request: string){
    const url = 'https://api.spotify.com/v1/search?q=' + request + '&type=track';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.get(url, { headers }).subscribe((data:any) => {
    this.items = data.tracks.items;
    // @ts-ignore
      this.newItems.next(this.items);
    });
  }

}
