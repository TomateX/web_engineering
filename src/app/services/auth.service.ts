import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const body = 'grant_type=client_credentials&client_id=2423c55c323b4f2a8aceffb27dfdcf53&client_secret=e1dc5f482cd348cdbf5938826fa03c3f';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, body, { headers }).subscribe((response:any) => {
      localStorage.setItem('token', response.access_token);
    });
  }
}
