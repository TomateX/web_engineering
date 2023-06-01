import {Component} from '@angular/core';
import {Album} from "../../../model/album.model";
import {AlbumsService} from "../../../services/albums.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: Album[] = [];

  constructor(private albumsService: AlbumsService) {
    this.albumsService.newAlbums.subscribe(albums => {
      this.albums = albums;
    })
  }

}
