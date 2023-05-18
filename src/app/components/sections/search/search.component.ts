import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private searchService: SearchService) {
  }

  onSubmit(searchForm: NgForm){
    if(searchForm.invalid){
      return;
    }
    this.searchService.search(searchForm.value.request);
  }
}
