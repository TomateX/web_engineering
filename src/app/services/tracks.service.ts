import {Injectable, OnDestroy} from '@angular/core';
import {SearchService} from "./search.service";
import {Track} from "../model/track.model";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TracksService implements OnDestroy{

  //Array mit allen Tracks die gefunden worden sind
  tracks: Track[] = [];
  newTracks = new Subject<Track[]>()

  //Subscription
  subscription!: Subscription;

  constructor(private searchService: SearchService) {
    //Subscription für die gefundenen Tracks vom Searchservice
    this.subscription = this.searchService.tracks.subscribe((tracks:any) => {
      this.tracks = [];
      for(let i = 0; i < tracks.length; i++){
        let id: string = tracks[i].id;
        let name: string = tracks[i].name;
        let img: string = tracks[i].album.images[0].url;
        let uri: string = tracks[i].uri;
        let artists: string[] = [];
        for(let z = 0; z < tracks[i].artists.length; z++){
          artists.push(tracks[i].artists[z].name);
        }
        this.tracks.push({id, name, img, uri, artists});
      }
      this.newTracks.next(this.tracks);
    })
  }


  //Manuelles unsubscribe
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
