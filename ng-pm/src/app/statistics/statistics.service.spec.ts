import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  const testEnvironmentProvider = { provide: 'baseUrl', useValue: 'http://localhost:3000' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatisticsService, testEnvironmentProvider]
    });
  });

  it('should be created', inject([StatisticsService], (service: StatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
