import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindhistoriquebyentrepriseComponent } from './findhistoriquebyentreprise.component';

describe('FindhistoriquebyentrepriseComponent', () => {
  let component: FindhistoriquebyentrepriseComponent;
  let fixture: ComponentFixture<FindhistoriquebyentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindhistoriquebyentrepriseComponent]
    });
    fixture = TestBed.createComponent(FindhistoriquebyentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
