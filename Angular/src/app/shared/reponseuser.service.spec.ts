import { TestBed } from '@angular/core/testing';

import { ReponseuserService } from './reponseuser.service';

describe('ReponseuserService', () => {
  let service: ReponseuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
