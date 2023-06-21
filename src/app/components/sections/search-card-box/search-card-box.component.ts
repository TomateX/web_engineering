import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {PlaylistsService} from "../../../services/playlists.service";
import {AlbumsService} from "../../../services/albums.service";
import {ArtistsService} from "../../../services/artists.service";
import {TracksService} from "../../../services/tracks.service";
import {Track} from "../../../model/track.model";

@Component({
  selector: 'app-search-card-box',
  templateUrl: './search-card-box.component.html',
  styleUrls: ['./search-card-box.component.css']
})
export class SearchCardBoxComponent {

  items: {id: string, uri: string, name: string, img: string, creator: string }[] = [];
  type: string = '';

  constructor(private router: Router, private searchService: SearchService, private playlistsService: PlaylistsService, private albumsService: AlbumsService, private artistsService: ArtistsService, private tracksService: TracksService) {
    let id: string = '';
    let uri: string = '';
    let name: string = '';
    let img: string = '';
    let creator: string = '';

    if(router.url.includes('playlist')){
      this.playlistsService.newSelectedPlaylist.subscribe(playlist => {
        this.items = [];
        let tracks = playlist.tracks;
        this.setTrackItems(tracks);
      })
    }

    if(router.url.includes('album')){
      this.albumsService.newSelectedAlbum.subscribe(album => {
        this.items = [];
        let tracks = album.tracks;
        this.setTrackItems(tracks);
      })
    }

    this.playlistsService.newPlaylists.subscribe(playlists => {
      this.type = 'playlist';
      this.items = [];
      for (let i = 0; i < playlists.length; i++){
        id = playlists[i].id;
        uri = playlists[i].uri;
        name = playlists[i].name;
        img = playlists[i].img;
        creator = playlists[i].owner;
        this.items.push({id, uri, name, img, creator});
      }
    })

    this.albumsService.newAlbums.subscribe(albums => {
      this.type = 'album';
      this.items = [];
      for (let i = 0; i < albums.length; i++){
        id = albums[i].id;
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
        this.items.push({id, uri, name, img, creator});
      }
    })

    this.artistsService.newArtists.subscribe(artists => {
      this.type = 'artist';
      this.items = [];
      for (let i = 0; i < artists.length; i++){
        id = artists[i].id;
        uri = artists[i].uri;
        name = artists[i].name;
        img = artists[i].img;
        creator = '';
        this.items.push({id, uri, name, img, creator});
      }
    })
    this.tracksService.newTracks.subscribe(tracks => {
      this.type = 'track';
      this.items = [];
      this.setTrackItems(tracks);
    })
  }

  setTrackItems(tracks: Track[]){
    let id: string = '';
    let uri: string = '';
    let name: string = '';
    let img: string = '';
    let creator: string = '';
    for (let i = 0; i < tracks.length; i++){
      id = tracks[i].id;
      uri = tracks[i].uri;
      name = tracks[i].name;
      img = tracks[i].img;
      creator = '';
      for(let z = 0; z < tracks[i].artists.length; z++){
        creator += tracks[i].artists[z];
        if(!(z+1 == tracks[i].artists.length)){
          creator += ', ';
        }
      }
      this.items.push({id, uri, name, img, creator});
    }
  }
}
