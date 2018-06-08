import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { TimeComponent } from './time.component';
import { Time } from './time.model';
import { TimeService } from './time.service';
import { DurationPipe } from '../shared/duration.pipe';

describe('TimeComponent', () => {
  const times = [
    new Time().fromValues(123, '2018-06-01T00:00', 'Project 1', 'Cost Type 2', 42, 'hard work'),
    new Time().fromValues(124, '2018-06-01T00:00', 'Project 2', 'Cost Type 2', 24, 'hard work')
  ];

  const timeService = jasmine.createSpyObj('TimeService', ['getAllTimes']);
  const getAllTimesSpy = timeService.getAllTimes.and.returnValue(of(times));

  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TimeComponent, DurationPipe],
      providers: [{ provide: TimeService, useValue: timeService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
