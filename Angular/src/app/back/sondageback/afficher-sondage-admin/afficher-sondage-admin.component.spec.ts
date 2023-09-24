import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSondageAdminComponent } from './afficher-sondage-admin.component';

describe('AfficherSondageAdminComponent', () => {
  let component: AfficherSondageAdminComponent;
  let fixture: ComponentFixture<AfficherSondageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherSondageAdminComponent]
    });
    fixture = TestBed.createComponent(AfficherSondageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
