import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSondageComponent } from './list-sondage.component';

describe('ListSondageComponent', () => {
  let component: ListSondageComponent;
  let fixture: ComponentFixture<ListSondageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSondageComponent]
    });
    fixture = TestBed.createComponent(ListSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
