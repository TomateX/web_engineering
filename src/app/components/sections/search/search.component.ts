import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(http: HttpClient){

  }

  onSubmit(searchForm: NgForm){
    if(searchForm.invalid){
      return;
    }
  }
}
