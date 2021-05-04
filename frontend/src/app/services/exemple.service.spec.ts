import { TestBed } from '@angular/core/testing';

import { ExempleService } from './exemple.service';

describe('ExempleService', () => {
  let service: ExempleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExempleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
