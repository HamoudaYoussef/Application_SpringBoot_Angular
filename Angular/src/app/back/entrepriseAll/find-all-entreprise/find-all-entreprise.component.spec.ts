import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllEntrepriseComponent } from './find-all-entreprise.component';

describe('FindAllEntrepriseComponent', () => {
  let component: FindAllEntrepriseComponent;
  let fixture: ComponentFixture<FindAllEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindAllEntrepriseComponent]
    });
    fixture = TestBed.createComponent(FindAllEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
