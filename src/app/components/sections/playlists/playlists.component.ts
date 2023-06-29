import {Component, OnInit} from '@angular/core';
import {PlaylistsService} from "../../../services/playlists.service";
import {Playlist} from "../../../model/playlist.model";
import {Album} from "../../../model/album.model";
import {AlbumsService} from "../../../services/albums.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit{

  playlist: Playlist = new Playlist('', '', '', '', '');
  album: Album = new Album('', '', '', '', []);
  type: string|null = '';

  constructor(private playlistsService: PlaylistsService, private albumService: AlbumsService, private router: Router) {
  }

  ngOnInit() {
    if(this.router.url.includes('album')){
      this.type = 'album';
      this.album = this.albumService.getSelectedAlbum();
      this.albumService.newSelectedAlbum.subscribe(newAlbum => {
        this.album = newAlbum;
      })
    }
    else{
      this.type = 'playlist';
      this.playlist = this.playlistsService.getSelectedPlaylist();
      this.playlistsService.newSelectedPlaylist.subscribe(newPlaylist => {
        this.playlist = newPlaylist;
      })
    }
  }
}
