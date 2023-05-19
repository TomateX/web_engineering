import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent implements OnInit{

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
