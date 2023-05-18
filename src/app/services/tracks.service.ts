import {Injectable, OnDestroy} from '@angular/core';
import {SearchService} from "./search.service";
import {Track} from "../model/track.model";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TracksService implements OnDestroy{

  tracks: Track[] = [];
  newTracks = new Subject<Track[]>()

  subscription!: Subscription;

  constructor(private searchService: SearchService) {
    this.subscription = this.searchService.newItems.subscribe((tracks:any) => {
      this.tracks = [];
      for(let i = 0; i < tracks.length; i++){
        let id: string = tracks[i].id;
        let name: string = tracks[i].name;
        let img: string = tracks[i].album.images[0].url;
        let artists: string[] = [];
        for(let z = 0; z < tracks[i].artists.length; z++){
          artists.push(tracks[i].artists[z].name);
        }
        this.tracks.push({id, name, img, artists});
      }
      this.newTracks.next(this.tracks);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
