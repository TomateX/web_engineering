import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() typeEvent = new EventEmitter<string>();

  constructor(private searchService: SearchService) {
  }

  onSubmit(searchForm: NgForm){
    if(searchForm.invalid){
      return;
    }
    this.typeEvent.emit(searchForm.value.searchType);
    this.searchService.search(searchForm.value.request, searchForm.value.searchType);
  }
}
