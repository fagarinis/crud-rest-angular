import { TestBed } from '@angular/core/testing';

import { SettoreService } from './settore.service';

describe('SettoreService', () => {
  let service: SettoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
