import { Component } from '@angular/core';
import {TracksService} from "../../../services/tracks.service";
import {Track} from "../../../model/track.model";

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {

  tracks: Track[] = [];

  constructor(private tracksService: TracksService) {
    this.tracksService.newTracks.subscribe(tracks => {
      this.tracks = tracks;
    })
  }

}
