import { Component } from '@angular/core';
import {Artist} from "../../../model/artist.model";
import {ArtistsService} from "../../../services/artists.service";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {

  artists: Artist[] = [];

  constructor(private artistsService: ArtistsService) {
    this.artistsService.newArtists.subscribe(artists => {
      this.artists = artists;
    })
  }
}
