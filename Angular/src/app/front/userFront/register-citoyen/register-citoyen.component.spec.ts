import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCitoyenComponent } from './register-citoyen.component';

describe('RegisterCitoyenComponent', () => {
  let component: RegisterCitoyenComponent;
  let fixture: ComponentFixture<RegisterCitoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCitoyenComponent]
    });
    fixture = TestBed.createComponent(RegisterCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
