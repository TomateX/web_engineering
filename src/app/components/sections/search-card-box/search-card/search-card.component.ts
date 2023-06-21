import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {PlaylistsService} from "../../../../services/playlists.service";
import {AlbumsService} from "../../../../services/albums.service";

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent {

  constructor(private router: Router, private playlistsService: PlaylistsService, private albumsService: AlbumsService) {
  }

  @Input('type') type: string = '';
  @Input('uri') uri: string = '';
  @Input('id') id: string = '';
  @Input('name') name: string = '';
  @Input('img') img: string = '';
  @Input('creator') creator: string = '';


  onSearchCard(uri: string){
    switch (this.type){
      case 'playlist':
        this.playlistsService.getPlaylistApi(this.id);
        this.router.navigate(['playlist', this.name]);
        break;
      case 'album':
        this.albumsService.getAlbumApi(this.id);
        this.router.navigate(['album', this.name]);
        break;
      default:
        window.open(uri, '_blank');
    }
  }


}
