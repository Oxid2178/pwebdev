import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { TimeDetailComponent } from './time-detail.component';
import { TimeService } from '../time.service';
import { Time } from '../time.model';
import { TimeConverterService } from '../timeConverter.service';

describe('TimeDetailComponent', () => {
  const time = new Time().fromValues(
    123,
    '2018-06-01T00:00',
    'Project 1',
    'Cost Type 2',
    42,
    'hard work'
  );

  const projects = [
    {
      id: 1,
      name: 'Project 1',
      costTypes: [{ id: 1, name: 'Cost Type 1' }, { id: 2, name: 'Cost Type 2' }]
    }
  ];

  const timeService = jasmine.createSpyObj('TimeService', ['getTime', 'getAllProjects']);
  const timeConverterService = jasmine.createSpyObj('TimeConverterService', ['convertAmountInMinutes']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  const getTimeSpy = timeService.getTime.and.returnValue(of(time));
  const getAllProjectsSpy = timeService.getAllProjects.and.returnValue(of(projects));

  let component: TimeDetailComponent;
  let fixture: ComponentFixture<TimeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TimeDetailComponent],
      providers: [
        { provide: TimeService, useValue: timeService },
        { provide: TimeConverterService, useValue: timeConverterService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ id: 123 })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
