import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {

  errorstatus: boolean = false;

  constructor(private searchService: SearchService) {
    searchService.error.subscribe((errorStatus) => {
      this.errorstatus = errorStatus;
    })
  }

}
