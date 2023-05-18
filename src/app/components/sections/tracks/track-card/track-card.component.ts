import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent {

  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('artists') artists: string = '';

}
