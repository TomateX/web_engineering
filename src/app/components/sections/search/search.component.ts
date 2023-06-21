import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SearchService} from "../../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() typeEvent = new EventEmitter<string>();

  constructor(private router: Router, private searchService: SearchService) {
  }
  onSubmit(searchForm: NgForm){
    if(searchForm.invalid){
      return;
    }
    this.searchService.search(searchForm.value.request, searchForm.value.searchType);
    this.router.navigate(['/search', searchForm.value.searchType ,searchForm.value.request]);
  }
}
