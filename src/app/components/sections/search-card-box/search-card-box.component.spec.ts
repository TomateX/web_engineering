import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCardBoxComponent } from './search-card-box.component';

describe('SearchCardBoxComponent', () => {
  let component: SearchCardBoxComponent;
  let fixture: ComponentFixture<SearchCardBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCardBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
