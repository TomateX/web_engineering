import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent {

  constructor(private router: Router) {
  }

  @Output() playlistMode = new EventEmitter<boolean>();

  @Input('type') type: string = '';
  @Input('uri') uri: string = '';
  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('creator') creator: string = '';


  onSearchCard(uri: string){
    if(this.type == 'playlist'){
      this.router.navigate(['playlist', this.name]);
    }
    else if(this.type == 'album'){
      this.router.navigate(['album', this.name]);
    }
    else{
      window.open(uri, '_blank');
    }
  }


}
