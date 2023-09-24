import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenInterfaceComponent } from './citoyen-interface.component';

describe('CitoyenInterfaceComponent', () => {
  let component: CitoyenInterfaceComponent;
  let fixture: ComponentFixture<CitoyenInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitoyenInterfaceComponent]
    });
    fixture = TestBed.createComponent(CitoyenInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
