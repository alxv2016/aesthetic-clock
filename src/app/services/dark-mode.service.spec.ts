import {TestBed} from '@angular/core/testing';

import {DarkModeService} from './dark-mode.service';

describe('DarkModeServiceService', () => {
  let service: DarkModeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
