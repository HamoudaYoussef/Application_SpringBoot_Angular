import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSondageComponent } from './afficher-sondage.component';

describe('AfficherSondageComponent', () => {
  let component: AfficherSondageComponent;
  let fixture: ComponentFixture<AfficherSondageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherSondageComponent]
    });
    fixture = TestBed.createComponent(AfficherSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
