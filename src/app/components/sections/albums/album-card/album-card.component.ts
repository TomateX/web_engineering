import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit{

  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('uri') uri: string = '';
  @Input('artists') artists: string[] = [];

  strArtists: string = '';

  constructor() {}

  ngOnInit() {
    for(let i = 0; i < this.artists.length; i++){
      this.strArtists += this.artists[i];
      if(!(i+1 == this.artists.length)){
        this.strArtists += ', ';
      }
    }
  }
}
