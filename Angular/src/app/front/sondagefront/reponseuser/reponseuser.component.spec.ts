import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseuserComponent } from './reponseuser.component';

describe('ReponseuserComponent', () => {
  let component: ReponseuserComponent;
  let fixture: ComponentFixture<ReponseuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReponseuserComponent]
    });
    fixture = TestBed.createComponent(ReponseuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
