import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent {

  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('uri') uri: string = '';

}
