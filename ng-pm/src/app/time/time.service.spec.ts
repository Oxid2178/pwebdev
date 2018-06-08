import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  const testEnvironmentProvider = { provide: 'baseUrl', useValue: 'http://localhost:3000' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimeService, testEnvironmentProvider]
    });
  });

  it('should be created', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));
});
