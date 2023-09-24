import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseInterfaceComponent } from './entreprise-interface.component';

describe('EntrepriseInterfaceComponent', () => {
  let component: EntrepriseInterfaceComponent;
  let fixture: ComponentFixture<EntrepriseInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepriseInterfaceComponent]
    });
    fixture = TestBed.createComponent(EntrepriseInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
