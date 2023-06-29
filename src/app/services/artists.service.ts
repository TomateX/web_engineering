import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {SearchService} from "./search.service";
import {Artist} from "../model/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService implements OnDestroy{

  //Array mit allen Künstlern die gefunden worden
  artists: Artist[] = [];
  newArtists = new Subject<Artist[]>()


  subscription!: Subscription;

  constructor(private searchService: SearchService) {
    //Subscription für die gefundenen Künstler im Searchservice
    this.subscription = this.searchService.artists.subscribe((artists:any) => {
      this.artists = [];
      for(let i = 0; i < artists.length; i++){
        let id: string = artists[i].id;
        let name: string = artists[i].name;
        let img: string = 'assets/image/default_profile.jpg';
        if(artists[i].images[0])
          img = artists[i].images[0].url;
        let uri: string = artists[i].uri;
        this.artists.push({id, name, img, uri});
      }
      this.newArtists.next(this.artists);
    })
  }


  //Manuelles unsubscribe
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
