import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TimeConverterService } from './timeConverter.service';

describe('TimeConverterService', () => {
  const testEnvironmentProvider = { provide: 'baseUrl', useValue: 'http://localhost:3000' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimeConverterService, testEnvironmentProvider]
    });
  });

  it('should be created', inject([TimeConverterService], (service: TimeConverterService) => {
    expect(service).toBeTruthy();
   }));

  it('amount should be converted from hour in minute correctly', inject([TimeConverterService], (service: TimeConverterService) => {
    expect(service.convertAmountInMinutes("2.5")).toBe(150);
  }));

  // it('amount should be converted from string in number correctly', inject([TimeConverterService], (service: TimeConverterService) => {
  //   expect(service.getAmountInNumber("08:06", 0, 2)).toBe(8);
  // }));

});
