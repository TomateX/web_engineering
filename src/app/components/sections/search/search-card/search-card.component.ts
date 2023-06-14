import { Component } from '@angular/core';
import {PlaylistsService} from "../../../../services/playlists.service";
import {AlbumsService} from "../../../../services/albums.service";
import {ArtistsService} from "../../../../services/artists.service";
import {TracksService} from "../../../../services/tracks.service";

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent {

  items: {uri: string, name: string, img: string, creator: string }[] = [];

  constructor(private playlistsService: PlaylistsService, private albumsService: AlbumsService, private artistsService: ArtistsService, private tracksService: TracksService) {
    let uri: string = '';
    let name: string = '';
    let img: string = '';
    let creator: string = '';

    this.playlistsService.newPlaylists.subscribe(playlists => {
      this.items = [];
      for (let i = 0; i < playlists.length; i++){
        uri = playlists[i].uri;
        name = playlists[i].name;
        img = playlists[i].img;
        creator = playlists[i].owner;
        this.items.push({uri, name, img, creator});
      }
    })
    this.albumsService.newAlbums.subscribe(albums => {
      this.items = [];
      for (let i = 0; i < albums.length; i++){
        uri = albums[i].uri;
        name = albums[i].name;
        img = albums[i].img;
        creator = '';
        for(let z = 0; z < albums[i].artists.length; z++){
          creator += albums[i].artists[z];
          if(!(i+1 == albums[i].artists[z].length)){
            creator += ', ';
          }
        }
        this.items.push({uri, name, img, creator});
      }
    })
    this.artistsService.newArtists.subscribe(artists => {
      this.items = [];
      for (let i = 0; i < artists.length; i++){
        uri = artists[i].uri;
        name = artists[i].name;
        img = artists[i].img;
        creator = '';
        this.items.push({uri, name, img, creator});
      }
    })
    this.tracksService.newTracks.subscribe(tracks => {
      this.items = [];
      for (let i = 0; i < tracks.length; i++){
        uri = tracks[i].uri;
        name = tracks[i].name;
        img = tracks[i].img;
        creator = '';
        for(let z = 0; z < tracks[i].artists.length; z++){
          creator += tracks[i].artists[z];
          if(!(i+1 == tracks[i].artists[z].length)){
            creator += ', ';
          }
        }
        this.items.push({uri, name, img, creator});
      }
    })
  }


}
