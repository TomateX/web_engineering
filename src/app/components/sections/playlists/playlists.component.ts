import { Component } from '@angular/core';
import {PlaylistsService} from "../../../services/playlists.service";
import {Playlist} from "../../../model/playlist.model";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {

  playlists: Playlist[] = [];

  constructor(private playlistsService: PlaylistsService) {
    this.playlistsService.newPlaylists.subscribe(playlists => {
      this.playlists = playlists;
    })
  }

}
