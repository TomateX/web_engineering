import { Component } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {

  type: string = '';

  setType(newType: string){
    this.type = newType;
  }

}
