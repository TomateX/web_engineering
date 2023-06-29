import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //Methode um den Token zu bekommen
  getToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const body = 'grant_type=client_credentials&client_id=2423c55c323b4f2a8aceffb27dfdcf53&client_secret=e1dc5f482cd348cdbf5938826fa03c3f';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, body, { headers }).pipe(
      tap((response: any) => {
        const expirationTime = new Date().getTime() + response.expires_in * 1000;
        //token und expiration time werden im local storage gespeichert
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('expirationTime', expirationTime.toString());
      })
    );
  }
}
