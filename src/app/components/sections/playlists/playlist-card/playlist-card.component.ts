import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.css']
})
export class PlaylistCardComponent {
  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('uri') uri: string = '';
  @Input('owner') owner: string = '';

  constructor() {}

}
