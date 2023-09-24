import { TestBed } from '@angular/core/testing';

import { SharedAfficherReponseUserService } from './shared-afficher-reponse-user.service';

describe('SharedAfficherReponseUserService', () => {
  let service: SharedAfficherReponseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAfficherReponseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
